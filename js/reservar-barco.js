// Get barco ID from URL
const urlParams = new URLSearchParams(window.location.search);
const barcoId = parseInt(urlParams.get('barco'));

// Carregar barcos do localStorage
const barcos = JSON.parse(localStorage.getItem('barcos') || '[]');

// Find barco
const barco = barcos.find(b => b.id === barcoId);

// Calendar state
let currentDate = new Date();
const selectedDays = [];
const maxDays = 5;

// Mock agenda data - dias bloqueados/reservados
const agendaStatus = {
    '2026-03-10': { status: 'reservado', cliente: 'Manuel Santos' },
    '2026-03-11': { status: 'reservado', cliente: 'Manuel Santos' },
    '2026-03-15': { status: 'bloqueado', motivo: 'Manutenção' },
    '2026-03-20': { status: 'reservado', cliente: 'Maria Silva' },
    '2026-03-21': { status: 'reservado', cliente: 'Maria Silva' },
    '2026-03-25': { status: 'ferias', motivo: 'Férias' },
    '2026-03-26': { status: 'ferias', motivo: 'Férias' },
    '2026-03-27': { status: 'ferias', motivo: 'Férias' },
    '2026-04-05': { status: 'bloqueado', motivo: 'Inspeção' },
    '2026-04-12': { status: 'reservado', cliente: 'João Pereira' },
};

// Render barco info
function renderBarcoInfo() {
    const container = document.getElementById('barcoInfo');
    container.innerHTML = `
        <img src="${barco.foto}" alt="${barco.nome}" class="barco-hero">
        
        <h2 class="barco-title">${barco.nome}</h2>
        <p class="barco-subtitle">
            <i class="fas fa-map-marker-alt"></i> ${barco.porto} · ${barco.tipo}
        </p>
        
        <div class="barco-specs-grid">
            <div class="spec-box">
                <i class="fas fa-ruler-horizontal"></i>
                <span class="label">Comprimento</span>
                <span class="value">${barco.comprimento}m</span>
            </div>
            <div class="spec-box">
                <i class="fas fa-users"></i>
                <span class="label">Capacidade</span>
                <span class="value">${barco.capacidade} pessoas</span>
            </div>
            <div class="spec-box">
                <i class="fas fa-cog"></i>
                <span class="label">Motor</span>
                <span class="value">${barco.motor}</span>
            </div>
            <div class="spec-box">
                <i class="fas fa-calendar"></i>
                <span class="label">Ano</span>
                <span class="value">${barco.ano}</span>
            </div>
        </div>
        
        <div class="capitao-section">
            <h4><i class="fas fa-user-tie"></i> Capitão</h4>
            <div class="capitao-details">
                <div class="capitao-avatar">${barco.capitao.avatar}</div>
                <div class="capitao-text">
                    <h5>${barco.capitao.nome}</h5>
                    <p>${barco.capitao.experiencia} anos de experiência</p>
                    <p style="color: var(--accent);">
                        <i class="fas fa-star"></i> ${barco.rating} (${barco.avaliacoes} avaliações)
                    </p>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 1.5rem;">
            <h4 style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem;">
                <i class="fas fa-check-circle"></i> Extras Incluídos
            </h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${barco.extras.map(extra => `
                    <span style="background: rgba(255, 143, 0, 0.1); padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem; color: var(--accent);">
                        <i class="fas fa-check"></i> ${extra}
                    </span>
                `).join('')}
            </div>
        </div>
    `;
}

// Get day status
function getDayStatus(dateStr) {
    if (agendaStatus[dateStr]) {
        return agendaStatus[dateStr].status;
    }
    const date = new Date(dateStr + 'T12:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) {
        return 'passado';
    }
    
    return 'disponivel';
}

// Format date to YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format date to readable format
function formatDateReadable(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

// Render calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month display
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    document.getElementById('mesAtual').textContent = `${months[month]} ${year}`;
    
    // Get first day of month and days in month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    // Build calendar HTML
    let calendarHTML = '';
    
    // Day headers
    const dayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    dayHeaders.forEach(day => {
        calendarHTML += `<div class="dia-header">${day}</div>`;
    });
    
    // Empty cells before first day
    for (let i = 0; i < startDayOfWeek; i++) {
        const prevMonthDate = new Date(year, month, 0 - (startDayOfWeek - i - 1));
        const dateStr = formatDate(prevMonthDate);
        calendarHTML += `<div class="dia-cell outro-mes">${prevMonthDate.getDate()}</div>`;
    }
    
    // Days of current month
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = formatDate(date);
        const status = getDayStatus(dateStr);
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = selectedDays.includes(dateStr);
        
        let classes = ['dia-cell', status];
        if (isToday) classes.push('hoje');
        if (isSelected) classes.push('selecionado');
        
        let icon = '';
        if (status === 'reservado') icon = '<span class="dia-icon">✅</span>';
        if (status === 'bloqueado') icon = '<span class="dia-icon">🚫</span>';
        if (status === 'ferias') icon = '<span class="dia-icon">🏖️</span>';
        
        const clickable = status === 'disponivel' || isSelected;
        const onclick = clickable ? `onclick="toggleDay('${dateStr}')"` : '';
        
        calendarHTML += `
            <div class="${classes.join(' ')}" ${onclick}>
                ${day}
                ${icon}
            </div>
        `;
    }
    
    // Fill remaining cells
    const totalCells = Math.ceil((startDayOfWeek + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (startDayOfWeek + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
        calendarHTML += `<div class="dia-cell outro-mes">${i}</div>`;
    }
    
    document.getElementById('calendarioGrid').innerHTML = calendarHTML;
}

// Toggle day selection
window.toggleDay = function(dateStr) {
    const index = selectedDays.indexOf(dateStr);
    
    if (index > -1) {
        // Remove day
        selectedDays.splice(index, 1);
    } else {
        // Add day
        if (selectedDays.length >= maxDays) {
            showToast(`Só pode selecionar até ${maxDays} dias`, 'warning');
            return;
        }
        selectedDays.push(dateStr);
    }
    
    // Sort selected days
    selectedDays.sort();
    
    updateSelectedDaysInfo();
    renderCalendar();
    updateSubmitButton();
};

// Update selected days info
function updateSelectedDaysInfo() {
    const container = document.getElementById('diasSelecionadosInfo');
    const countElem = document.getElementById('diasCount');
    const listaElem = document.getElementById('diasLista');
    
    if (selectedDays.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    countElem.textContent = selectedDays.length;
    
    listaElem.innerHTML = selectedDays.map(dateStr => 
        `<div style="margin: 0.3rem 0;">📅 ${formatDateReadable(dateStr)}</div>`
    ).join('');
}

// Update submit button
function updateSubmitButton() {
    const btn = document.getElementById('btnEnviarReserva');
    btn.disabled = selectedDays.length === 0;
}

// Navigate month
document.getElementById('mesAnterior').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('mesSeguinte').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Handle form submission
document.getElementById('reservaForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (selectedDays.length === 0) {
        showToast('Selecione pelo menos um dia', 'error');
        return;
    }
    
    const formData = {
        barcoId: barco.id,
        barcoNome: barco.nome,
        capitao: barco.capitao.nome,
        capitaoEmail: barco.capitao.email,
        capitaoTelefone: barco.capitao.telefone,
        dias: selectedDays,
        cliente: {
            nome: document.getElementById('nomeCliente').value,
            email: document.getElementById('emailCliente').value,
            telefone: document.getElementById('telefoneCliente').value,
            numPescadores: document.getElementById('numPescadores').value,
            mensagem: document.getElementById('mensagemCliente').value
        },
                // Campos compatíveis com dashboards
        clienteNome: document.getElementById('nomeCliente').value,
        clienteEmail: document.getElementById('emailCliente').value,
        clienteTelefone: document.getElementById('telefoneCliente').value,
        capitaoNome: barco.capitao.nome,
        numPessoas: parseInt(document.getElementById('numPescadores').value) || 1,
        totalPagar: null,
        dataPedido: new Date().toISOString(),
        status: 'pendente',
        dataEnvio: new Date().toISOString()
    };
    
    // Save to localStorage (simulate backend)
    const reservas = JSON.parse(localStorage.getItem('reservasPendentes') || '[]');
    formData.id = Date.now();
    reservas.push(formData);
    localStorage.setItem('reservasPendentes', JSON.stringify(reservas));
    
    // 📧 ENVIAR EMAILS DE RESERVA (Capitão + Cliente)
    const datasSelecionadasTexto = formData.dias.map(d => formatDateReadable(d)).join(', ');
    
    // 1️⃣ Email para o CAPITÃO
    if (typeof enviarEmailReservaCapitao === 'function') {
        enviarEmailReservaCapitao({
            capitaoNome: formData.capitao,
            capitaoEmail: formData.capitaoEmail,
            clienteNome: formData.cliente.nome,
            clienteEmail: formData.cliente.email,
            clienteTelefone: formData.cliente.telefone,
            barcoNome: formData.barcoNome,
            datasSelecionadas: datasSelecionadasTexto,
            numPescadores: formData.cliente.numPescadores,
            mensagem: formData.cliente.mensagem || 'Sem mensagem adicional'
        }).then(result => {
            if (result.success) {
                console.log('✅ Email enviado ao capitão:', formData.capitaoEmail);
            } else {
                console.error('❌ Erro ao enviar email ao capitão:', result.error);
            }
        });
    }
    
    // 2️⃣ Email para o CLIENTE (confirmação)
    if (typeof enviarEmailReservaCliente === 'function') {
        enviarEmailReservaCliente({
            clienteNome: formData.cliente.nome,
            clienteEmail: formData.cliente.email,
            barcoNome: formData.barcoNome,
            capitaoNome: formData.capitao,
            datasSelecionadas: datasSelecionadasTexto,
            numPescadores: formData.cliente.numPescadores
        }).then(result => {
            if (result.success) {
                console.log('✅ Email de confirmação enviado ao cliente:', formData.cliente.email);
            } else {
                console.error('❌ Erro ao enviar email ao cliente:', result.error);
            }
        });
    }
    
    // Show success modal
    showReservaSuccessModal(formData);
});

// Show success modal
function showReservaSuccessModal(data) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <button class="modal-close" onclick="this.closest('.modal').remove(); window.location.href='escolher-barco.html';">
                <i class="fas fa-times"></i>
            </button>
            <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: rgba(76, 175, 80, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: #4CAF50;"></i>
                </div>
                <h2 style="color: var(--accent); margin-bottom: 1rem;">Pedido Enviado!</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                    O seu pedido de reserva foi enviado para o Capitão ${data.capitao}.
                </p>
                
                <div style="background: rgba(255, 255, 255, 0.03); padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; text-align: left;">
                    <h4 style="color: var(--accent); margin-bottom: 1rem;">📋 Resumo da Reserva</h4>
                    <p style="margin: 0.5rem 0;"><strong>Barco:</strong> ${data.barcoNome}</p>
                    <p style="margin: 0.5rem 0;"><strong>Dias:</strong> ${data.dias.length} dia(s)</p>
                    <p style="margin: 0.5rem 0;"><strong>Pescadores:</strong> ${data.cliente.numPescadores}</p>
                    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                        <p style="font-size: 0.9rem; color: var(--text-secondary);">
                            <i class="fas fa-calendar"></i> ${data.dias.map(d => formatDateReadable(d)).join(', ')}
                        </p>
                    </div>
                </div>
                
                <div style="background: rgba(33, 150, 243, 0.1); padding: 1rem; border-radius: 8px; margin: 1.5rem 0; border-left: 4px solid #2196F3;">
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">
                        <i class="fas fa-info-circle"></i> O capitão irá contactá-lo em breve por telefone ou email para confirmar os detalhes e acordar o pagamento.
                    </p>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                    <a href="escolher-barco.html" class="btn" style="flex: 1;">
                        Ver Outros Barcos
                    </a>
                    <a href="index.html" class="btn btn-primary" style="flex: 1;">
                        Voltar ao Início
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    showToast('Pedido de reserva enviado com sucesso!', 'success');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBarcoInfo();
    renderCalendar();
    updateSelectedDaysInfo();
    updateSubmitButton();
});
