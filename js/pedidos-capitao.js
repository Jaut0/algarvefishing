// Dashboard Capitão - Gestão de Pedidos de Reserva
// Load pending reservations and display them

// 🧹 LIMPEZA AUTOMÁTICA DE DADOS MOCK/TESTE
(function limparDadosMock() {
    // Limpar reservas pendentes mock/teste
    const reservas = JSON.parse(localStorage.getItem('reservasPendentes') || '[]');
    const reservasReais = reservas.filter(r => {
        // Remover reservas de teste
        const emailTeste = r.cliente?.email?.toLowerCase() || '';
        const nomeTeste = r.cliente?.nome?.toLowerCase() || '';
        return !emailTeste.includes('teste') && 
               !emailTeste.includes('test') && 
               !nomeTeste.includes('teste') &&
               !nomeTeste.includes('test') &&
               r.cliente?.telefone && // Deve ter telefone
               r.cliente?.email && // Deve ter email
               r.dias && r.dias.length > 0; // Deve ter dias
    });
    
    if (reservas.length !== reservasReais.length) {
        console.log(`🧹 Limpeza: ${reservas.length - reservasReais.length} reservas mock removidas`);
        localStorage.setItem('reservasPendentes', JSON.stringify(reservasReais));
    }
})();

function loadPedidosPendentes() {
    const reservas = JSON.parse(localStorage.getItem('reservasPendentes') || '[]');
    const container = document.getElementById('pedidosPendentesList');
    const badge = document.getElementById('badgePendentes');
    
    // Filter only pending reservations
    const pendentes = reservas.filter(r => r.status === 'pendente');
    
    // Update badge
    badge.textContent = pendentes.length;
    badge.style.display = pendentes.length > 0 ? 'inline-block' : 'none';
    
    if (pendentes.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-calendar-check" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Nenhum pedido de reserva pendente</p>
            </div>
        `;
        return;
    }
    
    // Render pending reservations
    container.innerHTML = pendentes.map(reserva => {
        const diasFormatted = reserva.dias.map(d => formatDateShort(d)).join(', ');
        
        return `
            <div class="pedido-card" data-id="${reserva.id}">
                <div class="pedido-header">
                    <div class="pedido-barco">
                        <i class="fas fa-ship"></i>
                        <strong>${reserva.barcoNome}</strong>
                    </div>
                    <span class="badge badge-warning">Pendente</span>
                </div>
                
                <div class="pedido-content">
                    <div class="pedido-info-grid">
                        <div class="pedido-info-item">
                            <i class="fas fa-user"></i>
                            <div>
                                <span class="label">Cliente</span>
                                <span class="value">${reserva.cliente.nome}</span>
                            </div>
                        </div>
                        
                        <div class="pedido-info-item">
                            <i class="fas fa-calendar-alt"></i>
                            <div>
                                <span class="label">Dias Solicitados</span>
                                <span class="value">${reserva.dias.length} dia(s)</span>
                            </div>
                        </div>
                        
                        <div class="pedido-info-item">
                            <i class="fas fa-users"></i>
                            <div>
                                <span class="label">Pescadores</span>
                                <span class="value">${reserva.cliente.numPescadores} pessoa(s)</span>
                            </div>
                        </div>
                        
                        <div class="pedido-info-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <span class="label">Recebido</span>
                                <span class="value">${getTimeAgo(reserva.dataEnvio)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pedido-dias">
                        <strong>📅 Datas:</strong> ${diasFormatted}
                    </div>
                    
                    <div class="pedido-contacto">
                        <div>
                            <i class="fas fa-envelope"></i> ${reserva.cliente.email}
                        </div>
                        <div>
                            <i class="fas fa-phone"></i> ${reserva.cliente.telefone}
                        </div>
                    </div>
                    
                    ${reserva.cliente.mensagem ? `
                        <div class="pedido-mensagem">
                            <strong>💬 Mensagem:</strong>
                            <p>${reserva.cliente.mensagem}</p>
                        </div>
                    ` : ''}
                </div>
                
                <div class="pedido-acoes">
                    <button class="btn btn-success" onclick="aceitarPedido(${reserva.id})">
                        <i class="fas fa-check"></i> Aceitar e Reservar Dias
                    </button>
                    <button class="btn btn-secondary" onclick="contactarCliente('${reserva.cliente.telefone}')">
                        <i class="fas fa-phone"></i> Ligar
                    </button>
                    <button class="btn btn-secondary" onclick="emailCliente('${reserva.cliente.email}')">
                        <i class="fas fa-envelope"></i> Email
                    </button>
                    <button class="btn btn-danger-outline" onclick="rejeitarPedido(${reserva.id})">
                        <i class="fas fa-times"></i> Rejeitar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Accept reservation request
window.aceitarPedido = function(reservaId) {
    const reservas = JSON.parse(localStorage.getItem('reservasPendentes') || '[]');
    const reserva = reservas.find(r => r.id === reservaId);
    
    if (!reserva) return;
    
    // Show confirmation modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <button class="modal-close" onclick="this.closest('.modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 style="color: var(--accent); margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i> Aceitar Reserva
            </h2>
            <p style="margin-bottom: 1rem;">
                Confirma que deseja aceitar esta reserva? Os seguintes dias serão marcados como <strong>Reservado</strong> na sua agenda:
            </p>
            <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                ${reserva.dias.map(d => `<div>📅 ${formatDateReadable(d)}</div>`).join('')}
            </div>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 1rem 0;">
                <strong>Cliente:</strong> ${reserva.cliente.nome}<br>
                <strong>Telefone:</strong> ${reserva.cliente.telefone}<br>
                <strong>Pescadores:</strong> ${reserva.cliente.numPescadores}
            </p>
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                <button class="btn btn-secondary" style="flex: 1;" onclick="this.closest('.modal').remove()">
                    Cancelar
                </button>
                <button class="btn btn-success" style="flex: 1;" onclick="confirmarAceitacao(${reservaId})">
                    <i class="fas fa-check"></i> Confirmar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

// Confirm acceptance
window.confirmarAceitacao = function(reservaId) {
    const reservas = JSON.parse(localStorage.getItem('reservasPendentes') || '[]');
    const index = reservas.findIndex(r => r.id === reservaId);
    
    if (index === -1) return;
    
    const reserva = reservas[index];
    
    // Update status to accepted
    reserva.status = 'aceite';
    reserva.dataAceite = new Date().toISOString();
    
    // Update agenda with reserved days
    const agendaStatus = JSON.parse(localStorage.getItem('agendaStatus') || '{}');
    reserva.dias.forEach(dia => {
        agendaStatus[dia] = {
            status: 'reservado',
            cliente: reserva.cliente.nome,
            telefone: reserva.cliente.telefone,
            numPescadores: reserva.cliente.numPescadores
        };
    });
    localStorage.setItem('agendaStatus', JSON.stringify(agendaStatus));
    
    // Save updated reservations
    localStorage.setItem('reservasPendentes', JSON.stringify(reservas));
    
    // Close modal
    document.querySelector('.modal')?.remove();
    
    // Show success toast
    showToast('Reserva aceite! Os dias foram bloqueados na agenda.', 'success');
    
    // Reload list
    loadPedidosPendentes();
};

// Reject reservation request
window.rejeitarPedido = function(reservaId) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <button class="modal-close" onclick="this.closest('.modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 style="color: #f44336; margin-bottom: 1rem;">
                <i class="fas fa-times-circle"></i> Rejeitar Pedido
            </h2>
            <p style="margin-bottom: 1rem;">
                Tem a certeza que deseja rejeitar este pedido de reserva?
            </p>
            <div style="margin: 1.5rem 0;">
                <label style="display: block; margin-bottom: 0.5rem;">Motivo (opcional):</label>
                <textarea id="motivoRejeicao" style="width: 100%; padding: 0.8rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: var(--text-primary); min-height: 100px;" placeholder="Ex: Já tenho compromissos nessas datas, barco em manutenção..."></textarea>
            </div>
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-secondary" style="flex: 1;" onclick="this.closest('.modal').remove()">
                    Cancelar
                </button>
                <button class="btn btn-danger" style="flex: 1;" onclick="confirmarRejeicao(${reservaId})">
                    <i class="fas fa-times"></i> Rejeitar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

// Confirm rejection
window.confirmarRejeicao = function(reservaId) {
    const reservas = JSON.parse(localStorage.getItem('reservasPendentes') || '[]');
    const index = reservas.findIndex(r => r.id === reservaId);
    
    if (index === -1) return;
    
    const motivo = document.getElementById('motivoRejeicao')?.value || '';
    
    // Update status to rejected
    reservas[index].status = 'rejeitado';
    reservas[index].dataRejeicao = new Date().toISOString();
    reservas[index].motivoRejeicao = motivo;
    
    localStorage.setItem('reservasPendentes', JSON.stringify(reservas));
    
    // Close modal
    document.querySelector('.modal')?.remove();
    
    // Show toast
    showToast('Pedido rejeitado', 'info');
    
    // Reload list
    loadPedidosPendentes();
};

// Contact client by phone
window.contactarCliente = function(telefone) {
    window.location.href = `tel:${telefone}`;
};

// Email client
window.emailCliente = function(email) {
    window.location.href = `mailto:${email}`;
};

// Format date helper
function formatDateShort(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
}

function formatDateReadable(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
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

// Add CSS for pedido cards
const style = document.createElement('style');
style.textContent = `
    .pedido-card {
        background: var(--dark-bg);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }
    
    .pedido-card:hover {
        border-color: var(--accent);
        box-shadow: 0 4px 20px rgba(255, 143, 0, 0.2);
    }
    
    .pedido-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .pedido-barco {
        font-size: 1.2rem;
        color: var(--accent);
    }
    
    .pedido-barco i {
        margin-right: 0.5rem;
    }
    
    .pedido-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .pedido-info-item {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 0.8rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 8px;
    }
    
    .pedido-info-item i {
        font-size: 1.5rem;
        color: var(--accent);
    }
    
    .pedido-info-item .label {
        display: block;
        font-size: 0.75rem;
        color: var(--text-secondary);
        margin-bottom: 0.2rem;
    }
    
    .pedido-info-item .value {
        display: block;
        font-size: 0.95rem;
        color: var(--text-primary);
        font-weight: 600;
    }
    
    .pedido-dias {
        padding: 1rem;
        background: rgba(255, 143, 0, 0.1);
        border-radius: 8px;
        margin: 1rem 0;
        border-left: 4px solid var(--accent);
        color: var(--text-primary);
    }
    
    .pedido-contacto {
        display: flex;
        gap: 2rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 8px;
        margin: 1rem 0;
        font-size: 0.9rem;
        color: var(--text-secondary);
    }
    
    .pedido-contacto i {
        color: var(--accent);
        margin-right: 0.5rem;
    }
    
    .pedido-mensagem {
        padding: 1rem;
        background: rgba(33, 150, 243, 0.1);
        border-radius: 8px;
        margin: 1rem 0;
        border-left: 4px solid #2196F3;
    }
    
    .pedido-mensagem p {
        margin: 0.5rem 0 0;
        color: var(--text-secondary);
        font-size: 0.9rem;
        line-height: 1.6;
    }
    
    .pedido-acoes {
        display: flex;
        gap: 0.8rem;
        margin-top: 1.5rem;
        flex-wrap: wrap;
    }
    
    .pedido-acoes .btn {
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
    
    .badge {
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .badge-warning {
        background: rgba(255, 193, 7, 0.2);
        color: #FFC107;
    }
    
    @media (max-width: 768px) {
        .pedido-info-grid {
            grid-template-columns: 1fr;
        }
        
        .pedido-contacto {
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .pedido-acoes {
            flex-direction: column;
        }
        
        .pedido-acoes .btn {
            width: 100%;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
if (document.getElementById('pedidosPendentesList')) {
    loadPedidosPendentes();
    
    // Auto-refresh every 30 seconds
    setInterval(loadPedidosPendentes, 30000);
}
