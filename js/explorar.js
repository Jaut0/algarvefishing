// ============================================
// FishingHub - JavaScript para Explorar / Filtros
// ============================================

// Dados de saídas (carregados do localStorage ou vazios)
const saidasData = [];

let saidasFiltradas = [...saidasData];

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarSaidas();
    atualizarContadorResultados(); // ✅ ADICIONAR ESTA LINHA
    initFiltros();
});

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
    
    container.innerHTML = saidasFiltradas.map(saida => `
        <div class="saida-card fade-in">
            <img src="${saida.imagem}" alt="${saida.titulo}" class="saida-card-imagem">
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
                            <span>${saida.vagas}/${saida.lotacao} vagas</span>
                        </div>
                    ` : `
                        <div class="saida-card-info-item">
                            <i class="fas fa-user-friends"></i>
                            <span>Partilhada (${saida.vagasOcupadas}/${saida.vagasDisponiveis})</span>
                        </div>
                    `}
                    <div class="saida-card-info-item">
                        <i class="fas fa-star"></i>
                        <span>${saida.rating} (${saida.avaliacoes})</span>
                    </div>
                </div>
                
                <div class="saida-card-tipos">
                    ${saida.tipos.slice(0, 3).map(tipo => `
                        <span class="saida-card-tipo-badge">${tipo}</span>
                    `).join('')}
                </div>
                
                <div class="saida-card-preco">
                    <div>
                        <div class="saida-card-preco-valor">€${saida.preco}</div>
                        <div class="saida-card-preco-label">por pessoa</div>
                    </div>
                    <a href="detalhe-saida.html?id=${saida.id}" class="btn btn-primario btn-pequeno">
                        ${saida.vagas === 0 ? '<i class="fas fa-ban"></i> Esgotado' : '<i class="fas fa-arrow-right"></i> Ver Detalhes'}
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    
    // Reativar animações
    initScrollAnimations();
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
    
    // Listeners
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
    const precoMax = parseInt(document.getElementById('inputPrecoMax')?.value) || 999;
    const duracao = document.getElementById('inputDuracao')?.value || '';
    
    saidasFiltradas = saidasData.filter(saida => {
        // Pesquisa
        if (pesquisa && !saida.titulo.toLowerCase().includes(pesquisa) &&
            !saida.barco.toLowerCase().includes(pesquisa) &&
            !saida.capitao.toLowerCase().includes(pesquisa)) {
            return false;
        }
        
        // Localização
        if (localizacao && saida.localizacao !== localizacao) {
            return false;
        }
        
        // Tipo de Pesca
        if (tipoPesca && !saida.tipos.includes(tipoPesca)) {
            return false;
        }
        
        // Nível
        if (nivel && saida.nivel !== nivel) {
            return false;
        }
        
        // Preço
        if (saida.preco < precoMin || saida.preco > precoMax) {
            return false;
        }
        
        // Duração
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
    // Limpar inputs
    const inputs = document.querySelectorAll('.filtros-container input, .filtros-container select');
    inputs.forEach(input => {
        if (input.type === 'text' || input.type === 'number') {
            input.value = '';
        } else if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
        }
    });
    
    // Resetar preços
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
        contador.textContent = `${saidasFiltradas.length} saída${saidasFiltradas.length !== 1 ? 's' : ''} encontrada${saidasFiltradas.length !== 1 ? 's' : ''}`;
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

// Exportar funções
window.limparFiltros = limparFiltros;
window.saidasData = saidasData;