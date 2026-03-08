// ============================================
// FishingHub - JavaScript para Explorar / Filtros
// ============================================

// Dados de exemplo de saídas
const saidasData = [
    {
        id: 1,
        titulo: 'Aventura no Atlântico',
        barco: 'Mar Azul',
        capitao: 'Pedro Costa',
        imagem: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&h=400&fit=crop',
        localizacao: 'Porto de Lisboa',
        data: '2026-03-15',
        hora: '08:00',
        duracao: 8,
        preco: 75,
        lotacao: 8,
        vagas: 2,
        rating: 5.0,
        avaliacoes: 48,
        tipos: ['Pesca de Alto Mar', 'Pesca de Fundo'],
        nivel: 'Intermédio',
        extras: ['Equipamento', 'Isco', 'Lanches'],
        partilhada: false
    },
    {
        id: 2,
        titulo: 'Pesca Costeira no Algarve',
        barco: 'Oceano Calmo',
        capitao: 'João Silva',
        imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
        localizacao: 'Marina de Albufeira',
        data: '2026-03-18',
        hora: '09:00',
        duracao: 5,
        preco: 55,
        lotacao: 6,
        vagas: 4,
        rating: 4.5,
        avaliacoes: 32,
        tipos: ['Pesca Costeira', 'Pesca à Linha'],
        nivel: 'Iniciante',
        extras: ['Equipamento', 'Isco', 'Bebidas'],
        partilhada: false
    },
    {
        id: 3,
        titulo: 'Pesca de Atum na Madeira',
        barco: 'Pescador Bravo',
        capitao: 'Miguel Fernandes',
        imagem: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600&h=400&fit=crop',
        localizacao: 'Porto do Funchal',
        data: '2026-03-22',
        hora: '07:00',
        duracao: 10,
        preco: 120,
        lotacao: 10,
        vagas: 0,
        rating: 5.0,
        avaliacoes: 56,
        tipos: ['Pesca de Atum', 'Pesca de Alto Mar'],
        nivel: 'Avançado',
        extras: ['Equipamento', 'Isco', 'Lanches', 'Limpeza de Peixe'],
        partilhada: false
    },
    {
        id: 4,
        titulo: '🎣 Caça ao Atum Gigante - PARTILHADA',
        barco: 'Wicked Tuna',
        capitao: 'Carlos Marinho',
        imagem: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&h=400&fit=crop',
        localizacao: 'Marina de Portimão',
        data: '2026-03-20',
        hora: '06:00',
        duracao: 12,
        preco: 250,
        precoTotal: 1000,
        lotacao: 4,
        vagasDisponiveis: 4,
        vagasOcupadas: 2,
        vagas: 2,
        rating: 4.8,
        avaliacoes: 42,
        tipos: ['Pesca de Atum', 'Pesca de Alto Mar', 'Big Game'],
        nivel: 'Avançado',
        extras: ['Equipamento', 'Isco', 'Lanches', 'Bebidas', 'Limpeza de Peixe'],
        partilhada: true,
        participantes: [
            { nome: 'Marco Sousa', email: 'marco@email.com', telefone: '+351 912 345 678', dataReserva: '2026-03-05' },
            { nome: 'Rita Pereira', email: 'rita@email.com', telefone: '+351 934 567 890', dataReserva: '2026-03-08' }
        ]
    },
    {
        id: 5,
        titulo: '🎣 Pesca de Espadarte - PARTILHADA',
        barco: 'Oceano Profundo',
        capitao: 'André Santos',
        imagem: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
        localizacao: 'Porto de Sagres',
        data: '2026-03-25',
        hora: '05:30',
        duracao: 10,
        preco: 300,
        precoTotal: 1800,
        lotacao: 6,
        vagasDisponiveis: 6,
        vagasOcupadas: 1,
        vagas: 5,
        rating: 5.0,
        avaliacoes: 38,
        tipos: ['Pesca de Espadarte', 'Pesca de Alto Mar', 'Big Game'],
        nivel: 'Avançado',
        extras: ['Equipamento', 'Isco', 'Lanches', 'Bebidas', 'Seguro', 'Limpeza de Peixe'],
        partilhada: true,
        participantes: [
            { nome: 'José Rodrigues', email: 'jose@email.com', telefone: '+351 965 432 109', dataReserva: '2026-03-10' }
        ]
    }
        nivel: 'Avançado',
        extras: ['Equipamento', 'Isco', 'Lanches', 'Limpeza']
    },
    {
        id: 4,
        titulo: 'Pesca Desportiva no Porto',
        barco: 'Mar Douro',
        capitao: 'Carlos Mendes',
        imagem: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
        localizacao: 'Porto de Leixões',
        data: '2026-03-20',
        hora: '08:30',
        duracao: 6,
        preco: 65,
        lotacao: 8,
        vagas: 5,
        rating: 4.8,
        avaliacoes: 41,
        tipos: ['Pesca Desportiva', 'Pesca de Robalo'],
        nivel: 'Intermédio',
        extras: ['Equipamento', 'Bebidas']
    },
    {
        id: 5,
        titulo: 'Jigging Experience',
        barco: 'Rápido',
        capitao: 'Rui Alves',
        imagem: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=400&fit=crop',
        localizacao: 'Marina de Cascais',
        data: '2026-03-25',
        hora: '07:30',
        duracao: 7,
        preco: 85,
        lotacao: 6,
        vagas: 3,
        rating: 4.7,
        avaliacoes: 28,
        tipos: ['Pesca de Jigging', 'Pesca de Alto Mar'],
        nivel: 'Intermédio',
        extras: ['Equipamento', 'Isco', 'Lanches']
    },
    {
        id: 6,
        titulo: 'Família no Mar',
        barco: 'Alegria',
        capitao: 'Ana Rodrigues',
        imagem: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=400&fit=crop',
        localizacao: 'Porto de Setúbal',
        data: '2026-03-17',
        hora: '10:00',
        duracao: 4,
        preco: 45,
        lotacao: 8,
        vagas: 6,
        rating: 4.9,
        avaliacoes: 62,
        tipos: ['Pesca Costeira', 'Pesca à Linha'],
        nivel: 'Iniciante',
        extras: ['Equipamento', 'Isco', 'Lanches', 'Bebidas']
    }
];

let saidasFiltradas = [...saidasData];

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarSaidas();
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