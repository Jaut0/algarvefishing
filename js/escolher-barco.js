// Load barcos from localStorage (real data from registrations)
const getBarcos = () => {
    const stored = localStorage.getItem('barcos');
    if (stored) {
        try {
            return JSON.parse(stored).filter(b => b.status === 'aprovado');
        } catch (e) {
            console.error('Erro ao carregar barcos:', e);
            return [];
        }
    }
    return [];
};

const barcos = getBarcos();
let barcosFilteredList = [...barcos];

// Render barcos grid
function renderBarcos(barcosList) {
    const grid = document.getElementById('barcosGrid');
    const count = document.getElementById('countBarcos');
    
    count.textContent = barcosList.length;
    
    if (barcosList.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem;">
                <i class="fas fa-ship" style="font-size: 5rem; color: var(--tuna-orange); margin-bottom: 1.5rem; opacity: 0.5;"></i>
                <h3 style="color: var(--tuna-orange); margin-bottom: 1rem;">Nenhum Barco Disponível</h3>
                <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto;">
                    Ainda não existem barcos aprovados na plataforma. Se é capitão, registe-se e adicione o seu barco!
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="auth.html" class="btn btn-primary">
                        <i class="fas fa-user-plus"></i> Registar como Capitão
                    </a>
                    <a href="index.html" class="btn btn-secondary">
                        <i class="fas fa-home"></i> Voltar ao Início
                    </a>
                </div>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = barcosList.map(barco => `
        <div class="barco-card">
            <img src="${barco.foto}" alt="${barco.nome}" class="barco-img">
            <div class="barco-content">
                <div class="barco-header">
                    <div>
                        <h3 class="barco-nome">${barco.nome}</h3>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">
                            <i class="fas fa-map-marker-alt"></i> ${barco.porto}
                        </p>
                    </div>
                    <span class="barco-status status-${barco.status}">
                        <i class="fas fa-check-circle"></i> Aprovado
                    </span>
                </div>
                
                <div class="barco-specs">
                    <div class="spec-item">
                        <i class="fas fa-ruler-horizontal"></i>
                        <span>${barco.comprimento}m</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-users"></i>
                        <span>${barco.capacidade} pessoas</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-ship"></i>
                        <span>${barco.tipo}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-cog"></i>
                        <span>${barco.motor}</span>
                    </div>
                </div>
                
                <div class="barco-capitao">
                    <div class="capitao-avatar">${barco.capitao.avatar}</div>
                    <div class="capitao-info">
                        <h4>Capitão ${barco.capitao.nome}</h4>
                        <p>
                            ${barco.capitao.experiencia} anos de experiência
                            <span class="rating">
                                <i class="fas fa-star"></i> ${barco.rating} (${barco.avaliacoes})
                            </span>
                        </p>
                    </div>
                </div>
                
                <div style="margin-top: 1rem;">
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.5rem;">
                        <i class="fas fa-check"></i> ${barco.extras.join(', ')}
                    </p>
                </div>
                
                <a href="reservar-barco.html?barco=${barco.id}" class="btn btn-primary" style="width: 100%; margin-top: 1rem; text-align: center;">
                    <i class="fas fa-calendar-check"></i> Ver Agenda e Reservar
                </a>
            </div>
        </div>
    `).join('');
}

// Apply filters
function applyFilters() {
    const local = document.getElementById('filterLocal').value.toLowerCase();
    const tipo = document.getElementById('filterTipo').value.toLowerCase();
    const capacidade = parseInt(document.getElementById('filterCapacidade').value) || 0;
    const ordenar = document.getElementById('filterOrdenar').value;
    
    barcosFilteredList = barcos.filter(barco => {
        const matchLocal = !local || barco.local.toLowerCase().includes(local);
        const matchTipo = !tipo || barco.tipo.toLowerCase().includes(tipo);
        const matchCapacidade = capacidade === 0 || barco.capacidade >= capacidade;
        
        return matchLocal && matchTipo && matchCapacidade;
    });
    
    // Sort
    if (ordenar === 'rating') {
        barcosFilteredList.sort((a, b) => b.rating - a.rating);
    } else if (ordenar === 'capacidade') {
        barcosFilteredList.sort((a, b) => b.capacidade - a.capacidade);
    } else {
        barcosFilteredList.sort((a, b) => b.ano - a.ano);
    }
    
    renderBarcos(barcosFilteredList);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBarcos(barcos);
    
    // Attach filter listeners
    document.getElementById('filterLocal').addEventListener('change', applyFilters);
    document.getElementById('filterTipo').addEventListener('change', applyFilters);
    document.getElementById('filterCapacidade').addEventListener('change', applyFilters);
    document.getElementById('filterOrdenar').addEventListener('change', applyFilters);
});
