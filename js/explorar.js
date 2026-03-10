// ============================================
// FishingHub - JavaScript para Explorar / Filtros
// ============================================

// Carregar saídas do localStorage
let saidasData = [];
let saidasFiltradas = [];

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    carregarSaidasDoStorage();
    renderizarSaidas();
    atualizarContadorResultados();
    initFiltros();
});

// ============================================
// CARREGAR SAÍDAS DO LOCALSTORAGE
// ============================================
function carregarSaidasDoStorage() {
    const dados = JSON.parse(localStorage.getItem('saidasData') || '[]');
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    // Apenas saídas ativas e com data futura ou de hoje
    saidasData = dados.filter(s => {
        if (s.status && s.status !== 'ativa') return false;
        const dataSaida = new Date(s.data);
        dataSaida.setHours(0, 0, 0, 0);
        return dataSaida >= hoje;
    });
    
    saidasFiltradas = [...saidasData];
}

// ============================================
// RENDERIZAR SAÍDAS
// ============================================
function renderizarSaidas() {
    const container = document.getElementById('resultadosSaidas');
    if (!container) {
        console.error('Container #resultadosSaidas não encontrado!');
        return;
    }
    
    if (saidasFiltradas.length === 0) {
        container.innerHTML = `
            <div class="estado-vazio" style="grid-column: 1 / -1;">
                <i class="fas fa-search estado-vazio-icon"></i>
                <h3 class="estado-vazio-titulo">Nenhuma saída encontrada</h3>
                <p class="estado-vazio-texto">
                    Tente ajustar os filtros para encontrar mais resultados
                </p>
                <button class="btn btn-primario" onclick="limparFiltros()">
                    Limpar Filtros
                </button>
            </div>
        `;
        return;
    }
    
    // Imagem placeholder caso não tenha
    const placeholderImg = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop';
    
    container.innerHTML = saidasFiltradas.map(saida => {
        const imagem = saida.imagem || placeholderImg;
        const vagas = saida.vagas !== undefined ? saida.vagas : (saida.lotacao || 0);
        const esgotado = vagas <= 0;
        
        return `
        <div class="saida-card fade-in">
            <img src="${imagem}" alt="${saida.titulo}" class="saida-card-imagem" onerror="this.src='${placeholderImg}'">
            <div class="saida-card-conteudo">
                <h3 class="saida-card-titulo">${saida.titulo}</h3>
                <p class="saida-card-descricao">
                    Saída de pesca com o Capitão ${saida.capitao} a bordo do barco "${saida.barco}".
                </p>
                
                <div class="saida-card-info">
                    <div class="saida-card-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${saida.localizacao}</span>
                    </div>
                    <div class="saida-card-info-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${formatarDataPT(saida.data)}</span>
                    </div>
                    <div class="saida-card-info-item">
                        <i class="fas fa-clock"></i>
                        <span>${saida.duracao}h</span>
                    </div>
                    ${!saida.partilhada ? `
                        <div class="saida-card-info-item">
                            <i class="fas fa-users"></i>
                            <span>${vagas}/${saida.lotacao || saida.capacidade || '?'} vagas</span>
                        </div>
                    ` : `
                        <div class="saida-card-info-item">
                            <i class="fas fa-user-friends"></i>
                            <span>Partilhada (${saida.vagasOcupadas || 0}/${saida.vagasDisponiveis})</span>
                        </div>
                    `}
                    ${saida.rating ? `
                    <div class="saida-card-info-item">
                        <i class="fas fa-star"></i>
                        <span>${saida.rating} (${saida.avaliacoes || 0})</span>
                    </div>
                    ` : ''}
                </div>
                
                <div class="saida-card-tipos">
                    ${(saida.tipos || []).slice(0, 3).map(tipo => `
                        <span class="saida-card-tipo-badge">${formatarTipoPesca(tipo)}</span>
                    `).join('')}
                </div>
                
                <div class="saida-card-preco">
                    <div>
                        <div class="saida-card-preco-valor">€${saida.preco}</div>
                        <div class="saida-card-preco-label">por pessoa</div>
                    </div>
                    <a href="detalhe-saida.html?id=${saida.id}" class="btn btn-primario btn-pequeno">
                        ${esgotado ? '<i class="fas fa-ban"></i> Esgotado' : '<i class="fas fa-arrow-right"></i> Ver Detalhes'}
                    </a>
                </div>
            </div>
        </div>
        `;
    }).join('');
    
    // Reativar animações
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
}

// Formatar label do tipo de pesca
function formatarTipoPesca(tipo) {
    const mapa = {
        'fundo': 'Pesca de Fundo',
        'alto_mar': 'Alto Mar',
        'jigging': 'Jigging',
        'atum': 'Pesca de Atum',
        'costeira': 'Pesca Costeira',
        'desportiva': 'Pesca Desportiva',
        'torneio': 'Torneio',
        'tuna': 'Pesca de Atum',
        'big-game': 'Big Game'
    };
    return mapa[tipo] || tipo;
}

// ============================================
// FILTROS
// ============================================
function initFiltros() {
    const inputPesquisa = document.getElementById('inputPesquisa');
    const selectLocalizacao = document.getElementById('selectLocalizacao');
    const selectTipoPesca = document.getElementById('selectTipoPesca');
    const selectNivel = document.getElementById('selectNivel');
    const inputPrecoMin = document.getElementById('inputPrecoMin');
    const inputPrecoMax = document.getElementById('inputPrecoMax');
    const inputDuracao = document.getElementById('inputDuracao');
    
    if (inputPesquisa) {
        inputPesquisa.addEventListener('input', aplicarFiltros);
    }
    
    [selectLocalizacao, selectTipoPesca, selectNivel, inputDuracao].forEach(el => {
        if (el) el.addEventListener('change', aplicarFiltros);
    });
    
    [inputPrecoMin, inputPrecoMax].forEach(el => {
        if (el) el.addEventListener('input', aplicarFiltros);
    });
}

function aplicarFiltros() {
    const pesquisa = document.getElementById('inputPesquisa')?.value.toLowerCase() || '';
    const localizacao = document.getElementById('selectLocalizacao')?.value || '';
    const tipoPesca = document.getElementById('selectTipoPesca')?.value || '';
    const nivel = document.getElementById('selectNivel')?.value || '';
    const precoMin = parseInt(document.getElementById('inputPrecoMin')?.value) || 0;
    const precoMax = parseInt(document.getElementById('inputPrecoMax')?.value) || 9999;
    const duracao = document.getElementById('inputDuracao')?.value || '';
    
    saidasFiltradas = saidasData.filter(saida => {
        if (pesquisa && !saida.titulo.toLowerCase().includes(pesquisa) &&
            !(saida.barco || '').toLowerCase().includes(pesquisa) &&
            !(saida.capitao || '').toLowerCase().includes(pesquisa)) {
            return false;
        }
        
        if (localizacao && saida.localizacao !== localizacao) {
            return false;
        }
        
        if (tipoPesca && !(saida.tipos || []).includes(tipoPesca)) {
            return false;
        }
        
        if (nivel && saida.nivel !== nivel) {
            return false;
        }
        
        if (saida.preco < precoMin || saida.preco > precoMax) {
            return false;
        }
        
        if (duracao) {
            if (duracao === 'curta' && saida.duracao > 4) return false;
            if (duracao === 'media' && (saida.duracao <= 4 || saida.duracao > 8)) return false;
            if (duracao === 'longa' && saida.duracao <= 8) return false;
        }
        
        return true;
    });
    
    renderizarSaidas();
    atualizarContadorResultados();
}

function limparFiltros() {
    const inputs = document.querySelectorAll('.filtros-container input, .filtros-container select');
    inputs.forEach(input => {
        if (input.type === 'text' || input.type === 'number') {
            input.value = '';
        } else if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
        }
    });
    
    const inputPrecoMin = document.getElementById('inputPrecoMin');
    const inputPrecoMax = document.getElementById('inputPrecoMax');
    if (inputPrecoMin) inputPrecoMin.value = 0;
    if (inputPrecoMax) inputPrecoMax.value = 200;
    
    saidasFiltradas = [...saidasData];
    renderizarSaidas();
    atualizarContadorResultados();
}

function atualizarContadorResultados() {
    const contador = document.getElementById('contadorResultados');
    if (contador) {
        const n = saidasFiltradas.length;
        contador.textContent = `${n} saída${n !== 1 ? 's' : ''} encontrada${n !== 1 ? 's' : ''}`;
    }
}

// ============================================
// UTILITÁRIOS
// ============================================
function gerarEstrelas(rating) {
    let html = '';
    const estrelasCompletas = Math.floor(rating);
    const temMeia = rating % 1 !== 0;
    
    for (let i = 0; i < estrelasCompletas; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    if (temMeia) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    const estrelasVazias = 5 - Math.ceil(rating);
    for (let i = 0; i < estrelasVazias; i++) {
        html += '<i class="far fa-star"></i>';
    }
    return html;
}

function formatarDataPT(data) {
    return new Date(data).toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

window.limparFiltros = limparFiltros;
