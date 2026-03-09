// Admin - Gestão de Reclamações

function loadReclamacoes() {
    const reclamacoes = JSON.parse(localStorage.getItem('reclamacoes') || '[]');
    const container = document.getElementById('reclamacoesContainer');
    const badge = document.getElementById('badgeReclamacoes');
    const statCard = document.getElementById('statReclamacoes');
    
    // Filter pendentes
    const pendentes = reclamacoes.filter(r => r.status === 'pendente');
    
    // Update badge and stat
    if (badge) {
        badge.textContent = pendentes.length;
        badge.style.display = pendentes.length > 0 ? 'inline-block' : 'none';
    }
    if (statCard) {
        statCard.textContent = pendentes.length;
    }
    
    if (!container) return;
    
    if (reclamacoes.length === 0) {
        container.innerHTML = `
            <div class="estado-vazio">
                <i class="fas fa-check-circle estado-vazio-icon" style="color: #4CAF50;"></i>
                <h3 class="estado-vazio-titulo">Nenhuma Reclamação</h3>
                <p class="estado-vazio-texto">Não há reclamações registadas</p>
            </div>
        `;
        return;
    }
    
    // Group by status
    const porStatus = {
        pendente: reclamacoes.filter(r => r.status === 'pendente'),
        emAnalise: reclamacoes.filter(r => r.status === 'emAnalise'),
        resolvida: reclamacoes.filter(r => r.status === 'resolvida'),
        rejeitada: reclamacoes.filter(r => r.status === 'rejeitada')
    };
    
    container.innerHTML = `
        <!-- Filtros -->
        <div style="margin-bottom: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn ${filtroStatus === 'todos' ? 'btn-primario' : 'btn-secundario'}" onclick="setFiltroReclamacoes('todos')">
                Todas (${reclamacoes.length})
            </button>
            <button class="btn ${filtroStatus === 'pendente' ? 'btn-primario' : 'btn-secundario'}" onclick="setFiltroReclamacoes('pendente')">
                <i class="fas fa-clock"></i> Pendentes (${porStatus.pendente.length})
            </button>
            <button class="btn ${filtroStatus === 'emAnalise' ? 'btn-primario' : 'btn-secundario'}" onclick="setFiltroReclamacoes('emAnalise')">
                <i class="fas fa-search"></i> Em Análise (${porStatus.emAnalise.length})
            </button>
            <button class="btn ${filtroStatus === 'resolvida' ? 'btn-primario' : 'btn-secundario'}" onclick="setFiltroReclamacoes('resolvida')">
                <i class="fas fa-check"></i> Resolvidas (${porStatus.resolvida.length})
            </button>
            <button class="btn ${filtroStatus === 'rejeitada' ? 'btn-primario' : 'btn-secundario'}" onclick="setFiltroReclamacoes('rejeitada')">
                <i class="fas fa-times"></i> Rejeitadas (${porStatus.rejeitada.length})
            </button>
        </div>
        
        <!-- Lista -->
        <div class="reclamacoes-lista">
            ${renderReclamacoesList(reclamacoes)}
        </div>
    `;
}

let filtroStatus = 'todos';

window.setFiltroReclamacoes = function(status) {
    filtroStatus = status;
    loadReclamacoes();
};

function renderReclamacoesList(reclamacoes) {
    let filteredList = reclamacoes;
    
    if (filtroStatus !== 'todos') {
        filteredList = reclamacoes.filter(r => r.status === filtroStatus);
    }
    
    // Sort by date (newest first)
    filteredList.sort((a, b) => new Date(b.dataEnvio) - new Date(a.dataEnvio));
    
    if (filteredList.length === 0) {
        return `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Nenhuma reclamação com o estado "${filtroStatus}"</p>
            </div>
        `;
    }
    
    return filteredList.map(rec => {
        const statusConfig = getStatusConfig(rec.status);
        const tipoConfig = getTipoConfig(rec.tipo);
        
        return `
            <div class="reclamacao-card" data-id="${rec.id}">
                <div class="reclamacao-header">
                    <div class="reclamacao-badges">
                        <span class="badge-status ${statusConfig.class}">
                            <i class="${statusConfig.icon}"></i> ${statusConfig.label}
                        </span>
                        <span class="badge-tipo ${tipoConfig.class}">
                            <i class="${tipoConfig.icon}"></i> ${tipoConfig.label}
                        </span>
                    </div>
                    <div class="reclamacao-numero">#${rec.id}</div>
                </div>
                
                <div class="reclamacao-content">
                    <h3 class="reclamacao-assunto">${rec.reclamacao.assunto}</h3>
                    
                    <div class="reclamacao-info-grid">
                        <div class="info-item">
                            <i class="fas fa-user"></i>
                            <div>
                                <span class="label">Cliente</span>
                                <span class="value">${rec.cliente.nome}</span>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-ship"></i>
                            <div>
                                <span class="label">Barco</span>
                                <span class="value">${rec.reserva.barco}</span>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-user-tie"></i>
                            <div>
                                <span class="label">Capitão</span>
                                <span class="value">${rec.reserva.capitao || 'Não informado'}</span>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-calendar"></i>
                            <div>
                                <span class="label">Data Reserva</span>
                                <span class="value">${formatDatePT(rec.reserva.data)}</span>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-euro-sign"></i>
                            <div>
                                <span class="label">Valor</span>
                                <span class="value">${rec.reserva.valor ? rec.reserva.valor + '€' : 'Não informado'}</span>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <span class="label">Recebida</span>
                                <span class="value">${getTimeAgo(rec.dataEnvio)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="reclamacao-descricao">
                        <strong>📝 Descrição:</strong>
                        <p>${rec.reclamacao.descricao}</p>
                    </div>
                    
                    <div class="reclamacao-contacto">
                        <strong>📞 Contactos do Cliente:</strong>
                        <div style="display: flex; gap: 2rem; margin-top: 0.5rem; flex-wrap: wrap;">
                            <div>
                                <i class="fas fa-envelope"></i> 
                                <a href="mailto:${rec.cliente.email}">${rec.cliente.email}</a>
                            </div>
                            <div>
                                <i class="fas fa-phone"></i> 
                                <a href="tel:${rec.cliente.telefone}">${rec.cliente.telefone}</a>
                            </div>
                            ${rec.cliente.nif ? `
                                <div>
                                    <i class="fas fa-id-card"></i> 
                                    NIF: ${rec.cliente.nif}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    ${rec.ficheiros && rec.ficheiros.length > 0 ? `
                        <div class="reclamacao-ficheiros">
                            <strong>📎 Anexos (${rec.ficheiros.length}):</strong>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                                ${rec.ficheiros.map((f, idx) => `
                                    <span style="background: rgba(255, 255, 255, 0.05); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.85rem;">
                                        <i class="${getFileIcon(f.nome)}"></i> ${f.nome}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${rec.notas ? `
                        <div class="reclamacao-notas">
                            <strong>📋 Notas Internas:</strong>
                            <p>${rec.notas}</p>
                        </div>
                    ` : ''}
                </div>
                
                <div class="reclamacao-acoes">
                    ${rec.status === 'pendente' ? `
                        <button class="btn btn-primario" onclick="marcarEmAnalise(${rec.id})">
                            <i class="fas fa-search"></i> Marcar Em Análise
                        </button>
                    ` : ''}
                    
                    ${rec.status === 'pendente' || rec.status === 'emAnalise' ? `
                        <button class="btn btn-success" onclick="resolverReclamacao(${rec.id})">
                            <i class="fas fa-check"></i> Marcar como Resolvida
                        </button>
                        <button class="btn btn-secondary" onclick="adicionarNotasReclamacao(${rec.id})">
                            <i class="fas fa-edit"></i> Adicionar Notas
                        </button>
                    ` : ''}
                    
                    <button class="btn btn-secondary" onclick="contactarClienteRec('${rec.cliente.email}', '${rec.cliente.telefone}', ${rec.id})">
                        <i class="fas fa-envelope"></i> Contactar Cliente
                    </button>
                    
                    ${rec.status !== 'rejeitada' ? `
                        <button class="btn btn-danger-outline" onclick="rejeitarReclamacao(${rec.id})">
                            <i class="fas fa-times"></i> Rejeitar
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function getStatusConfig(status) {
    const configs = {
        'pendente': { label: 'Pendente', class: 'status-pendente', icon: 'fas fa-clock' },
        'emAnalise': { label: 'Em Análise', class: 'status-analise', icon: 'fas fa-search' },
        'resolvida': { label: 'Resolvida', class: 'status-resolvida', icon: 'fas fa-check-circle' },
        'rejeitada': { label: 'Rejeitada', class: 'status-rejeitada', icon: 'fas fa-times-circle' }
    };
    return configs[status] || configs.pendente;
}

function getTipoConfig(tipo) {
    const configs = {
        'cancelamento': { label: 'Cancelamento', class: 'tipo-cancelamento', icon: 'fas fa-calendar-times' },
        'reembolso': { label: 'Reembolso', class: 'tipo-reembolso', icon: 'fas fa-money-bill-wave' },
        'comportamento': { label: 'Comportamento', class: 'tipo-comportamento', icon: 'fas fa-user-times' },
        'condicoes': { label: 'Condições', class: 'tipo-condicoes', icon: 'fas fa-ship' },
        'seguranca': { label: 'Segurança', class: 'tipo-seguranca', icon: 'fas fa-exclamation-triangle' },
        'outro': { label: 'Outro', class: 'tipo-outro', icon: 'fas fa-question-circle' }
    };
    return configs[tipo] || configs.outro;
}

function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const iconMap = {
        'pdf': 'fas fa-file-pdf',
        'doc': 'fas fa-file-word',
        'docx': 'fas fa-file-word',
        'jpg': 'fas fa-file-image',
        'jpeg': 'fas fa-file-image',
        'png': 'fas fa-file-image'
    };
    return iconMap[ext] || 'fas fa-file';
}

// Marcar em análise
window.marcarEmAnalise = function(id) {
    const reclamacoes = JSON.parse(localStorage.getItem('reclamacoes') || '[]');
    const rec = reclamacoes.find(r => r.id === id);
    
    if (rec) {
        rec.status = 'emAnalise';
        rec.dataAtualizacao = new Date().toISOString();
        localStorage.setItem('reclamacoes', JSON.stringify(reclamacoes));
        showToast('Reclamação marcada como "Em Análise"', 'info');
        loadReclamacoes();
    }
};

// Resolver reclamação
window.resolverReclamacao = function(id) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <button class="modal-close" onclick="this.closest('.modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 style="color: #4CAF50; margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i> Resolver Reclamação
            </h2>
            <p style="margin-bottom: 1.5rem;">
                Confirma que esta reclamação foi resolvida? Adicione uma nota sobre a resolução:
            </p>
            <textarea id="notaResolucao" style="width: 100%; padding: 1rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: var(--text-primary); min-height: 100px; margin-bottom: 1rem;" placeholder="Descreva como o problema foi resolvido..."></textarea>
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-secondary" style="flex: 1;" onclick="this.closest('.modal').remove()">
                    Cancelar
                </button>
                <button class="btn btn-success" style="flex: 1;" onclick="confirmarResolucao(${id})">
                    <i class="fas fa-check"></i> Confirmar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.confirmarResolucao = function(id) {
    const nota = document.getElementById('notaResolucao').value;
    const reclamacoes = JSON.parse(localStorage.getItem('reclamacoes') || '[]');
    const rec = reclamacoes.find(r => r.id === id);
    
    if (rec) {
        rec.status = 'resolvida';
        rec.dataResolucao = new Date().toISOString();
        rec.notaResolucao = nota;
        rec.dataAtualizacao = new Date().toISOString();
        localStorage.setItem('reclamacoes', JSON.stringify(reclamacoes));
        document.querySelector('.modal')?.remove();
        showToast('Reclamação marcada como resolvida!', 'success');
        loadReclamacoes();
    }
};

// Rejeitar reclamação
window.rejeitarReclamacao = function(id) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <button class="modal-close" onclick="this.closest('.modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 style="color: #f44336; margin-bottom: 1rem;">
                <i class="fas fa-times-circle"></i> Rejeitar Reclamação
            </h2>
            <p style="margin-bottom: 1.5rem;">
                Tem certeza que deseja rejeitar esta reclamação? Indique o motivo:
            </p>
            <textarea id="motivoRejeicao" style="width: 100%; padding: 1rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: var(--text-primary); min-height: 100px; margin-bottom: 1rem;" placeholder="Motivo da rejeição..."></textarea>
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-secondary" style="flex: 1;" onclick="this.closest('.modal').remove()">
                    Cancelar
                </button>
                <button class="btn btn-danger" style="flex: 1;" onclick="confirmarRejeicaoRec(${id})">
                    <i class="fas fa-times"></i> Rejeitar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.confirmarRejeicaoRec = function(id) {
    const motivo = document.getElementById('motivoRejeicao').value;
    const reclamacoes = JSON.parse(localStorage.getItem('reclamacoes') || '[]');
    const rec = reclamacoes.find(r => r.id === id);
    
    if (rec) {
        rec.status = 'rejeitada';
        rec.dataRejeicao = new Date().toISOString();
        rec.motivoRejeicao = motivo;
        rec.dataAtualizacao = new Date().toISOString();
        localStorage.setItem('reclamacoes', JSON.stringify(reclamacoes));
        document.querySelector('.modal')?.remove();
        showToast('Reclamação rejeitada', 'info');
        loadReclamacoes();
    }
};

// Adicionar notas
window.adicionarNotasReclamacao = function(id) {
    const reclamacoes = JSON.parse(localStorage.getItem('reclamacoes') || '[]');
    const rec = reclamacoes.find(r => r.id === id);
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <button class="modal-close" onclick="this.closest('.modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 style="color: var(--accent); margin-bottom: 1rem;">
                <i class="fas fa-edit"></i> Adicionar Notas Internas
            </h2>
            <textarea id="notasInternas" style="width: 100%; padding: 1rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: var(--text-primary); min-height: 120px; margin-bottom: 1rem;" placeholder="Notas sobre o caso...">${rec.notas || ''}</textarea>
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-secondary" style="flex: 1;" onclick="this.closest('.modal').remove()">
                    Cancelar
                </button>
                <button class="btn btn-primary" style="flex: 1;" onclick="salvarNotas(${id})">
                    <i class="fas fa-save"></i> Guardar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.salvarNotas = function(id) {
    const notas = document.getElementById('notasInternas').value;
    const reclamacoes = JSON.parse(localStorage.getItem('reclamacoes') || '[]');
    const rec = reclamacoes.find(r => r.id === id);
    
    if (rec) {
        rec.notas = notas;
        rec.dataAtualizacao = new Date().toISOString();
        localStorage.setItem('reclamacoes', JSON.stringify(reclamacoes));
        document.querySelector('.modal')?.remove();
        showToast('Notas guardadas', 'success');
        loadReclamacoes();
    }
};

// Contactar cliente
window.contactarClienteRec = function(email, telefone, id) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <button class="modal-close" onclick="this.closest('.modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 style="color: var(--accent); margin-bottom: 1.5rem;">
                <i class="fas fa-phone"></i> Contactar Cliente
            </h2>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <a href="mailto:${email}" class="btn btn-primary" style="text-decoration: none; text-align: center;">
                    <i class="fas fa-envelope"></i> Enviar Email
                </a>
                <a href="tel:${telefone}" class="btn btn-primary" style="text-decoration: none; text-align: center;">
                    <i class="fas fa-phone"></i> Ligar
                </a>
                <a href="https://wa.me/${telefone.replace(/\D/g, '')}" target="_blank" class="btn btn-primary" style="text-decoration: none; text-align: center;">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
                <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                    Fechar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

function formatDatePT(dateStr) {
    if (!dateStr) return 'Não informado';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
}

function getTimeAgo(isoDate) {
    const now = new Date();
    const past = new Date(isoDate);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `Há ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
    if (diffHours < 24) return `Há ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
    return `Há ${diffDays} dia${diffDays !== 1 ? 's' : ''}`;
}

// Add CSS
const style = document.createElement('style');
style.textContent = `
    .badge-count {
        background: #f44336;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 10px;
        font-size: 0.75rem;
        margin-left: 0.5rem;
    }
    
    .reclamacoes-lista {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .reclamacao-card {
        background: var(--dark-bg);
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .reclamacao-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .reclamacao-badges {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .badge-status, .badge-tipo {
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
    }
    
    .status-pendente { background: rgba(255, 193, 7, 0.2); color: #FFC107; }
    .status-analise { background: rgba(33, 150, 243, 0.2); color: #2196F3; }
    .status-resolvida { background: rgba(76, 175, 80, 0.2); color: #4CAF50; }
    .status-rejeitada { background: rgba(244, 67, 54, 0.2); color: #f44336; }
    
    .tipo-cancelamento { background: rgba(255, 87, 34, 0.1); color: #FF5722; }
    .tipo-reembolso { background: rgba(76, 175, 80, 0.1); color: #4CAF50; }
    .tipo-comportamento { background: rgba(244, 67, 54, 0.1); color: #f44336; }
    .tipo-condicoes { background: rgba(33, 150, 243, 0.1); color: #2196F3; }
    .tipo-seguranca { background: rgba(255, 152, 0, 0.1); color: #FF9800; }
    .tipo-outro { background: rgba(158, 158, 158, 0.1); color: #9E9E9E; }
    
    .reclamacao-numero {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--accent);
    }
    
    .reclamacao-assunto {
        font-size: 1.3rem;
        color: var(--accent);
        margin-bottom: 1rem;
    }
    
    .reclamacao-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .info-item {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 0.8rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 8px;
    }
    
    .info-item i {
        font-size: 1.3rem;
        color: var(--accent);
        width: 25px;
    }
    
    .info-item .label {
        display: block;
        font-size: 0.75rem;
        color: var(--text-secondary);
        margin-bottom: 0.2rem;
    }
    
    .info-item .value {
        display: block;
        font-size: 0.95rem;
        color: var(--text-primary);
        font-weight: 600;
    }
    
    .reclamacao-descricao,
    .reclamacao-contacto,
    .reclamacao-ficheiros,
    .reclamacao-notas {
        padding: 1rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 8px;
        margin: 1rem 0;
    }
    
    .reclamacao-descricao p,
    .reclamacao-notas p {
        margin: 0.5rem 0 0;
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    .reclamacao-acoes {
        display: flex;
        gap: 0.8rem;
        margin-top: 1.5rem;
        flex-wrap: wrap;
    }
    
    .reclamacao-acoes .btn {
        flex: 1;
        min-width: 150px;
    }
    
    .btn-success {
        background: #4CAF50;
        color: white;
    }
    
    .btn-success:hover {
        background: #45a049;
    }
    
    .btn-danger-outline {
        background: transparent;
        border: 1px solid #f44336;
        color: #f44336;
    }
    
    .btn-danger-outline:hover {
        background: #f44336;
        color: white;
    }
    
    @media (max-width: 768px) {
        .reclamacao-info-grid {
            grid-template-columns: 1fr;
        }
        
        .reclamacao-acoes {
            flex-direction: column;
        }
        
        .reclamacao-acoes .btn {
            width: 100%;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('reclamacoesContainer')) {
        loadReclamacoes();
        
        // Auto-refresh every minute
        setInterval(loadReclamacoes, 60000);
    }
});
