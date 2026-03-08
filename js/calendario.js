// ============================================
// FishingHub - JavaScript para Gestão de Agenda/Calendário
// ============================================

let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();
let diaSelecionado = null;

// Dados de exemplo dos bloqueios/reservas
let diasAgenda = {
    '2026-03-15': { estado: 'bloqueado', notas: 'Revisão do motor' },
    '2026-03-16': { estado: 'reservado', notas: 'Cliente João - contacto direto' },
    '2026-03-17': { estado: 'reservado', notas: 'Cliente Maria - tel: 912345678' },
    '2026-03-20': { estado: 'ferias', notas: 'Férias na Madeira' },
    '2026-03-21': { estado: 'ferias', notas: 'Férias na Madeira' },
    '2026-03-22': { estado: 'ferias', notas: 'Férias na Madeira' },
    '2026-03-23': { estado: 'ferias', notas: 'Férias na Madeira' },
    '2026-03-24': { estado: 'ferias', notas: 'Férias na Madeira' },
    '2026-03-25': { estado: 'ferias', notas: 'Férias na Madeira' },
    '2026-03-26': { estado: 'ferias', notas: 'Férias na Madeira' },
    '2026-03-27': { estado: 'ferias', notas: 'Férias na Madeira' }
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarCalendario();
});

// ============================================
// RENDERIZAR CALENDÁRIO
// ============================================
function renderizarCalendario() {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    // Atualizar título do mês
    document.getElementById('calendarioMes').textContent = `${meses[mesAtual]} ${anoAtual}`;
    
    // Primeiro e último dia do mês
    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);
    
    // Dia da semana do primeiro dia (0 = Domingo)
    const diaSemanaInicio = primeiroDia.getDay();
    
    // Total de dias no mês
    const totalDias = ultimoDia.getDate();
    
    // Grid do calendário
    const grid = document.querySelector('.calendario-grid');
    
    // Remover dias antigos (manter apenas os headers)
    const diasAntigos = grid.querySelectorAll('.calendario-dia');
    diasAntigos.forEach(dia => dia.remove());
    
    // Dia de hoje
    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth();
    const anoHoje = hoje.getFullYear();
    
    // Adicionar dias do mês anterior (se necessário)
    const ultimoDiaMesAnterior = new Date(anoAtual, mesAtual, 0).getDate();
    for (let i = diaSemanaInicio - 1; i >= 0; i--) {
        const dia = ultimoDiaMesAnterior - i;
        const divDia = criarDiaCalendario(dia, true, null);
        grid.appendChild(divDia);
    }
    
    // Adicionar dias do mês atual
    for (let dia = 1; dia <= totalDias; dia++) {
        const dataStr = `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const estadoDia = diasAgenda[dataStr];
        const ehHoje = (dia === diaHoje && mesAtual === mesHoje && anoAtual === anoHoje);
        
        const divDia = criarDiaCalendario(dia, false, estadoDia, ehHoje, dataStr);
        grid.appendChild(divDia);
    }
    
    // Adicionar dias do próximo mês para completar a grid
    const totalCelulas = grid.children.length - 7; // Subtrair headers
    const celulasRestantes = 42 - totalCelulas; // 6 semanas x 7 dias
    
    for (let dia = 1; dia <= celulasRestantes; dia++) {
        const divDia = criarDiaCalendario(dia, true, null);
        grid.appendChild(divDia);
    }
}

// ============================================
// CRIAR ELEMENTO DE DIA
// ============================================
function criarDiaCalendario(numero, outroMes, estado, ehHoje = false, dataStr = null) {
    const div = document.createElement('div');
    div.className = 'calendario-dia';
    
    if (outroMes) {
        div.classList.add('outro-mes');
    }
    
    if (ehHoje) {
        div.classList.add('hoje');
    }
    
    // Aplicar estado
    if (estado) {
        div.classList.add(estado.estado);
    } else {
        div.classList.add('disponivel');
    }
    
    // Número do dia
    const numeroDiv = document.createElement('div');
    numeroDiv.className = 'dia-numero';
    numeroDiv.textContent = numero;
    div.appendChild(numeroDiv);
    
    // Ícone do estado
    if (estado) {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'dia-icon';
        
        switch(estado.estado) {
            case 'bloqueado':
                iconDiv.innerHTML = '<i class="fas fa-ban" style="color: var(--cor-erro);"></i>';
                break;
            case 'reservado':
                iconDiv.innerHTML = '<i class="fas fa-check-circle" style="color: var(--cor-secundaria);"></i>';
                break;
            case 'ferias':
                iconDiv.innerHTML = '<i class="fas fa-umbrella-beach" style="color: var(--cor-destaque);"></i>';
                break;
        }
        
        div.appendChild(iconDiv);
    }
    
    // Status text
    const statusDiv = document.createElement('div');
    statusDiv.className = 'dia-status';
    
    if (estado) {
        switch(estado.estado) {
            case 'bloqueado':
                statusDiv.textContent = 'Bloqueado';
                statusDiv.style.color = 'var(--cor-erro)';
                break;
            case 'reservado':
                statusDiv.textContent = 'Reservado';
                statusDiv.style.color = 'var(--cor-secundaria)';
                break;
            case 'ferias':
                statusDiv.textContent = 'Férias';
                statusDiv.style.color = 'var(--cor-destaque)';
                break;
        }
    } else {
        statusDiv.textContent = 'Disponível';
        statusDiv.style.color = 'var(--cor-sucesso)';
    }
    
    div.appendChild(statusDiv);
    
    // Click event
    if (!outroMes && dataStr) {
        div.addEventListener('click', () => abrirModalDia(dataStr, numero));
    }
    
    return div;
}

// ============================================
// NAVEGAÇÃO DO CALENDÁRIO
// ============================================
function mesAnterior() {
    mesAtual--;
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    }
    renderizarCalendario();
}

function mesSeguinte() {
    mesAtual++;
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    }
    renderizarCalendario();
}

function hoje() {
    const agora = new Date();
    mesAtual = agora.getMonth();
    anoAtual = agora.getFullYear();
    renderizarCalendario();
}

// ============================================
// MODAL DIA INDIVIDUAL
// ============================================
function abrirModalDia(dataStr, dia) {
    diaSelecionado = dataStr;
    
    // Formatar data para português
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const [ano, mes, d] = dataStr.split('-');
    const titulo = `${d} de ${meses[parseInt(mes) - 1]}, ${ano}`;
    
    document.getElementById('modalDiaTitulo').textContent = titulo;
    
    // Preencher dados existentes
    const estado = diasAgenda[dataStr];
    if (estado) {
        document.getElementById('diaEstado').value = estado.estado;
        document.getElementById('diaNotas').value = estado.notas || '';
    } else {
        document.getElementById('diaEstado').value = 'disponivel';
        document.getElementById('diaNotas').value = '';
    }
    
    abrirModal('modalDia');
}

function guardarDia() {
    const estado = document.getElementById('diaEstado').value;
    const notas = document.getElementById('diaNotas').value;
    
    if (estado === 'disponivel' && !notas) {
        // Remover do objeto se for disponível e sem notas
        delete diasAgenda[diaSelecionado];
    } else {
        // Guardar estado
        diasAgenda[diaSelecionado] = {
            estado: estado,
            notas: notas
        };
    }
    
    fecharModal('modalDia');
    renderizarCalendario();
    
    let mensagem = 'Dia atualizado com sucesso!';
    if (estado === 'bloqueado') mensagem = 'Dia bloqueado com sucesso!';
    if (estado === 'reservado') mensagem = 'Dia marcado como reservado!';
    if (estado === 'ferias') mensagem = 'Dia marcado como férias!';
    if (estado === 'disponivel') mensagem = 'Dia liberado e disponível!';
    
    mostrarToast(mensagem, 'sucesso');
}

// ============================================
// AÇÕES RÁPIDAS
// ============================================
function abrirModalBloquearDia() {
    mostrarToast('Clique num dia do calendário para bloqueá-lo', 'aviso');
}

function abrirModalBloquearPeriodo() {
    // Definir datas padrão
    const hoje = new Date();
    const semanaDepois = new Date(hoje);
    semanaDepois.setDate(hoje.getDate() + 7);
    
    document.getElementById('periodoInicio').value = hoje.toISOString().split('T')[0];
    document.getElementById('periodoFim').value = semanaDepois.toISOString().split('T')[0];
    
    abrirModal('modalBloquearPeriodo');
}

function abrirModalMarcarReservado() {
    mostrarToast('Clique num dia do calendário e selecione "Reservado"', 'aviso');
}

function abrirModalVerBloqueios() {
    abrirModal('modalVerBloqueios');
}

// ============================================
// BLOQUEAR PERÍODO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const formBloquearPeriodo = document.getElementById('formBloquearPeriodo');
    if (formBloquearPeriodo) {
        formBloquearPeriodo.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const dataInicio = new Date(document.getElementById('periodoInicio').value);
            const dataFim = new Date(document.getElementById('periodoFim').value);
            const motivo = document.getElementById('periodoMotivo').value;
            const notas = document.getElementById('periodoNotas').value;
            
            if (dataInicio > dataFim) {
                mostrarToast('Data de início deve ser anterior à data de fim!', 'erro');
                return;
            }
            
            // Determinar estado baseado no motivo
            let estado = 'bloqueado';
            if (motivo === 'ferias') estado = 'ferias';
            
            // Bloquear todos os dias no intervalo
            let diasBloqueados = 0;
            const dataAtual = new Date(dataInicio);
            
            while (dataAtual <= dataFim) {
                const dataStr = dataAtual.toISOString().split('T')[0];
                diasAgenda[dataStr] = {
                    estado: estado,
                    notas: notas || `${motivo.charAt(0).toUpperCase() + motivo.slice(1)}`
                };
                diasBloqueados++;
                dataAtual.setDate(dataAtual.getDate() + 1);
            }
            
            fecharModal('modalBloquearPeriodo');
            renderizarCalendario();
            mostrarToast(`${diasBloqueados} dias bloqueados com sucesso!`, 'sucesso');
            
            // Limpar form
            document.getElementById('formBloquearPeriodo').reset();
        });
    }
});

// ============================================
// REMOVER BLOQUEIO
// ============================================
function removerBloqueio(id) {
    if (confirm('Tem a certeza que deseja remover este bloqueio?')) {
        mostrarToast('Bloqueio removido com sucesso!', 'sucesso');
        // Em produção, remover os dias específicos do objeto diasAgenda
        renderizarCalendario();
    }
}

// Exportar funções
window.mesAnterior = mesAnterior;
window.mesSeguinte = mesSeguinte;
window.hoje = hoje;
window.abrirModalBloquearDia = abrirModalBloquearDia;
window.abrirModalBloquearPeriodo = abrirModalBloquearPeriodo;
window.abrirModalMarcarReservado = abrirModalMarcarReservado;
window.abrirModalVerBloqueios = abrirModalVerBloqueios;
window.guardarDia = guardarDia;
window.removerBloqueio = removerBloqueio;