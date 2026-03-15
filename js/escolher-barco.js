// ============================================================
// escolher-barco.js — Lista de barcos aprovados
// Lê de localStorage('barcos') e mapeia campos do registar-barco
// ============================================================


// i18n helper (safe even if i18n loads after this script)
function TT(key) {
    try {
        if (window.PortalI18n && typeof window.PortalI18n.t === 'function') return window.PortalI18n.t(key);
    } catch (_) {}
    return key;
}

const PLACEHOLDER_BARCO = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop';

function getBarcos() {
    try {
        const stored = JSON.parse(localStorage.getItem('barcos') || '[]');
        return stored.filter(b => b.status === 'aprovado');
    } catch(e) {
        window.__err('Erro ao carregar barcos:', e);
        return [];
    }
}

const barcos = getBarcos();
let barcosFilteredList = [...barcos];

// ----------------------------------------------------------------
// Render
// ----------------------------------------------------------------
function renderBarcos(lista) {
    const grid  = document.getElementById('barcosGrid');
    const count = document.getElementById('countBarcos');
    if (!grid) return;
    count.textContent = lista.length;

    if (lista.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:4rem 2rem;">
                <i class="fas fa-ship" style="font-size:4rem;color:#FF8F00;margin-bottom:1rem;opacity:0.5;"></i>
                <h3 style="color:#1F2937;margin-bottom:0.75rem;">${TT('Nenhum Barco Disponível')}</h3>
                <p style="color:#6B7280;margin-bottom:2rem;max-width:500px;margin-left:auto;margin-right:auto;">
                    ${TT('Ainda não existem barcos aprovados na plataforma.')}<br>${TT('Se é capitão, registe-se e adicione o seu barco!')}
                </p>
                <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
                    <a href="auth.html" class="btn btn-primario"><i class="fas fa-user-plus"></i> ${TT('Registar como Capitão')}</a>
                    <a href="index.html" class="btn btn-outline"><i class="fas fa-home"></i> ${TT('Início')}</a>
                </div>
            </div>`;
        return;
    }

    grid.innerHTML = lista.map(b => {
        // Normalizar campos (suporta estrutura antiga e nova)
        const foto        = b.fotoPrincipal || (b.fotos && b.fotos[0]) || b.foto || PLACEHOLDER_BARCO;
        const capacidade  = b.lotacao || b.capacidade || '—';
        const motor       = b.tipoMotor || b.motor || '—';
        const capitaoNome = b.capitaoNome || (b.capitao && b.capitao.nome) || '—';
        const experiencia = b.capitaoExperiencia || (b.capitao && b.capitao.experiencia) || '';
        const rating      = b.avaliacaoMedia || b.rating || 0;
        const avaliacoes  = b.totalAvaliacoes || b.avaliacoes || 0;
        const extras      = Array.isArray(b.extras) ? b.extras.slice(0,5) : [];
        const classeNav   = b.classeNavegacao ? ` · ${TT('Classe')} ${b.classeNavegacao.replace('tipo', TT('Tipo') + ' ')}` : '';

        return `
        <div class="barco-card-pub">
            <img src="${foto}" alt="${b.nome}" class="barco-card-pub-img"
                 onerror="this.src='${PLACEHOLDER_BARCO}'">
            <div class="barco-card-pub-body">

                <div class="barco-card-pub-header">
                    <div>
                        <h3 class="barco-card-pub-nome">${b.nome}</h3>
                        <span class="barco-card-pub-porto">
                            <i class="fas fa-map-marker-alt"></i> ${b.porto}${classeNav}
                        </span>
                    </div>
                    <span class="badge-aprovado"><i class="fas fa-check-circle"></i> ${TT('Aprovado')}</span>
                </div>

                <div class="barco-card-pub-specs">
                    <div class="spec"><i class="fas fa-ruler-horizontal"></i><span>${b.comprimento}m</span></div>
                    <div class="spec"><i class="fas fa-users"></i><span>${capacidade} ${TT('pax')}</span></div>
                    <div class="spec"><i class="fas fa-ship"></i><span>${b.tipo}</span></div>
                    <div class="spec"><i class="fas fa-cog"></i><span>${motor}</span></div>
                </div>

                <div class="barco-card-pub-capitao">
                    <div class="capitao-av">${capitaoNome.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}</div>
                    <div>
                        <div style="font-weight:600;color:#1F2937;">${TT('Capitão')} ${capitaoNome}</div>
                        <div style="font-size:0.82rem;color:#6B7280;">
                            ${experiencia ? experiencia + ' ' + TT('anos exp.') : ''}
                            ${rating > 0 ? `<span style="color:#F59E0B;margin-left:0.5rem;"><i class="fas fa-star"></i> ${rating.toFixed(1)} (${avaliacoes})</span>` : ''}
                        </div>
                    </div>
                </div>

                ${extras.length > 0 ? `
                <div class="barco-card-pub-extras">
                    ${extras.map(e=>`<span class="extra-tag">${e}</span>`).join('')}
                </div>` : ''}

                <a href="reservar-barco.html?barco=${b.id}" class="btn btn-primario" style="width:100%;margin-top:1rem;text-align:center;display:block;">
                    <i class="fas fa-calendar-check"></i> Ver Agenda e Reservar
                </a>
            </div>
        </div>`;
    }).join('');
}

// ----------------------------------------------------------------
// Filtros
// ----------------------------------------------------------------
function applyFilters() {
    const local      = (document.getElementById('filterLocal')?.value || '').toLowerCase();
    const tipo       = (document.getElementById('filterTipo')?.value  || '').toLowerCase();
    const capacidade = parseInt(document.getElementById('filterCapacidade')?.value) || 0;
    const ordenar    = document.getElementById('filterOrdenar')?.value || '';

    barcosFilteredList = barcos.filter(b => {
        const cap = b.lotacao || b.capacidade || 0;
        const matchLocal = !local || (b.porto||'').toLowerCase().includes(local);
        const matchTipo  = !tipo  || (b.tipo||'').toLowerCase().includes(tipo);
        const matchCap   = capacidade === 0 || cap >= capacidade;
        return matchLocal && matchTipo && matchCap;
    });

    if (ordenar === 'rating') {
        barcosFilteredList.sort((a,b) => (b.avaliacaoMedia||0) - (a.avaliacaoMedia||0));
    } else if (ordenar === 'capacidade') {
        barcosFilteredList.sort((a,b) => ((b.lotacao||b.capacidade||0)) - ((a.lotacao||a.capacidade||0)));
    } else {
        barcosFilteredList.sort((a,b) => (b.ano||0) - (a.ano||0));
    }

    renderBarcos(barcosFilteredList);
}

// ----------------------------------------------------------------
// Init
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    renderBarcos(barcos);
    ['filterLocal','filterTipo','filterCapacidade','filterOrdenar'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', applyFilters);
    });
});
