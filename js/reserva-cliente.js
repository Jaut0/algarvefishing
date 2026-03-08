// ============================================
// FishingHub - JavaScript para Reserva do Cliente
// ============================================

let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();
let diasSelecionados = [];
const MAX_DIAS = 5;

// Dias indisponíveis (exemplo - virá do backend)
const diasIndisponiveis = {
    '2026-03-15': true,
    '2026-03-16': true,
    '2026-03-17': true,
    '2026-03-20': true,
    '2026-03-21': true,
    '2026-03-22': true,
    '2026-03-23': true,
    '2026-03-24': true,
    '2026-03-25': true,
    '2026-03-26': true,
    '2026-03-27': true
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarCalendario();
    initFormReserva();
});

// ============================================
// RENDERIZAR CALENDÁRIO
// ============================================
function renderizarCalendario() {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    document.getElementById('calendarioMes').textContent = `${meses[mesAtual]} ${anoAtual}`;
    
    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);
    const diaSemanaInicio = primeiroDia.getDay();
    const totalDias = ultimoDia.getDate();
    
    const grid = document.querySelector('.calendario-grid');
    const diasAntigos = grid.querySelectorAll('.calendario-dia');
    diasAntigos.forEach(dia => dia.remove());
    
    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth();
    const anoHoje = hoje.getFullYear();
    
    // Dias do mês anterior
    const ultimoDiaMesAnterior = new Date(anoAtual, mesAtual, 0).getDate();
    for (let i = diaSemanaInicio - 1; i >= 0; i--) {
        const dia = ultimoDiaMesAnterior - i;
        const divDia = criarDiaCalendario(dia, true, false, false);
        grid.appendChild(divDia);
    }
    
    // Dias do mês atual
    for (let dia = 1; dia <= totalDias; dia++) {
        const dataStr = `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const dataObj = new Date(anoAtual, mesAtual, dia);
        
        // Verificar se é passado
        const ehPassado = dataObj < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
        
        // Verificar se está indisponível
        const indisponivel = diasIndisponiveis[dataStr] || ehPassado;
        
        const ehHoje = (dia === diaHoje && mesAtual === mesHoje && anoAtual === anoHoje);
        const selecionado = diasSelecionados.includes(dataStr);
        
        const divDia = criarDiaCalendario(dia, false, indisponivel, ehHoje, selecionado, dataStr);
        grid.appendChild(divDia);
    }
    
    // Dias do próximo mês
    const totalCelulas = grid.children.length - 7;
    const celulasRestantes = 42 - totalCelulas;
    
    for (let dia = 1; dia <= celulasRestantes; dia++) {
        const divDia = criarDiaCalendario(dia, true, false, false);
        grid.appendChild(divDia);
    }
}

// ============================================
// CRIAR ELEMENTO DE DIA
// ============================================
function criarDiaCalendario(numero, outroMes, indisponivel, ehHoje, selecionado, dataStr) {
    const div = document.createElement('div');
    div.className = 'calendario-dia';
    
    if (outroMes) {
        div.classList.add('outro-mes');
    }
    
    if (ehHoje) {
        div.classList.add('hoje');
    }
    
    if (indisponivel) {
        div.classList.add('indisponivel');
    } else {
        div.classList.add('disponivel');
    }
    
    if (selecionado) {
        div.classList.add('selecionado');
    }
    
    // Número do dia
    const numeroDiv = document.createElement('div');
    numeroDiv.className = 'dia-numero';
    numeroDiv.textContent = numero;
    div.appendChild(numeroDiv);
    
    // Status text
    const statusDiv = document.createElement('div');
    statusDiv.className = 'dia-status';
    
    if (indisponivel) {
        statusDiv.textContent = 'Ocupado';
        statusDiv.style.color = 'var(--cor-erro)';
    } else if (selecionado) {
        statusDiv.textContent = 'Selecionado';
        statusDiv.style.color = 'var(--cor-secundaria)';
    } else {
        statusDiv.textContent = 'Disponível';
        statusDiv.style.color = 'var(--cor-sucesso)';
    }
    
    div.appendChild(statusDiv);
    
    // Click event
    if (!outroMes && !indisponivel && dataStr) {
        div.addEventListener('click', () => toggleDia(dataStr));
    }
    
    return div;
}

// ============================================
// SELECIONAR/DESSELECIONAR DIA
// ============================================
function toggleDia(dataStr) {
    const index = diasSelecionados.indexOf(dataStr);
    
    if (index > -1) {
        // Remover seleção
        diasSelecionados.splice(index, 1);
    } else {
        // Adicionar seleção (máximo 5 dias)
        if (diasSelecionados.length >= MAX_DIAS) {
            mostrarToast(`Pode selecionar no máximo ${MAX_DIAS} dias`, 'aviso');
            return;
        }
        diasSelecionados.push(dataStr);
    }
    
    // Ordenar datas
    diasSelecionados.sort();
    
    // Atualizar UI
    renderizarCalendario();
    atualizarResumo();
}

// ============================================
// ATUALIZAR RESUMO
// ============================================
function atualizarResumo() {
    const container = document.getElementById('diasSelecionados');
    const totalElement = document.getElementById('totalDias');
    const btnContinuar = document.getElementById('btnContinuar');
    
    totalElement.textContent = diasSelecionados.length;
    
    if (diasSelecionados.length === 0) {
        container.style.display = 'none';
        btnContinuar.disabled = true;
        return;
    }
    
    container.style.display = 'flex';
    btnContinuar.disabled = false;
    container.innerHTML = '';
    
    diasSelecionados.forEach(dataStr => {
        const tag = document.createElement('div');
        tag.className = 'dia-tag';
        tag.innerHTML = `
            <span>${formatarDataPT(dataStr)}</span>
            <button type="button" onclick="removerDia('${dataStr}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(tag);
    });
}

// ============================================
// REMOVER DIA
// ============================================
function removerDia(dataStr) {
    const index = diasSelecionados.indexOf(dataStr);
    if (index > -1) {
        diasSelecionados.splice(index, 1);
        renderizarCalendario();
        atualizarResumo();
    }
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
// MODAL RESERVA
// ============================================
function abrirModalReserva() {
    if (diasSelecionados.length === 0) {
        mostrarToast('Selecione pelo menos um dia', 'erro');
        return;
    }
    
    // Preencher resumo dos dias
    const resumo = document.getElementById('diasResumo');
    resumo.innerHTML = diasSelecionados.map(d => formatarDataPT(d)).join(', ');
    
    abrirModal('modalReserva');
}

// ============================================
// FORM RESERVA
// ============================================
function initFormReserva() {
    const form = document.getElementById('formPedidoReserva');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const dados = {
                barco: 'Mar Azul',
                barcoId: 1,
                capitao: 'Pedro Costa',
                dias: diasSelecionados,
                nome: document.getElementById('nomeCliente').value,
                email: document.getElementById('emailCliente').value,
                telefone: document.getElementById('telefoneCliente').value,
                numeroPessoas: document.getElementById('numeroPessoas').value,
                mensagem: document.getElementById('mensagemCliente').value
            };
            
            // Simular envio
            mostrarLoading();
            setTimeout(() => {
                esconderLoading();
                fecharModal('modalReserva');
                
                // Mostrar sucesso
                mostrarToast('Pedido enviado com sucesso!', 'sucesso');
                
                setTimeout(() => {
                    alert(`✅ Pedido de Reserva Enviado!\n\n📅 Dias solicitados: ${diasSelecionados.length}\n👤 Nome: ${dados.nome}\n📧 Email: ${dados.email}\n📞 Telefone: ${dados.telefone}\n\n⏳ O capitão ${dados.capitao} receberá o seu pedido e entrará em contacto em breve para confirmar a reserva.\n\n💡 Enquanto aguarda, pode verificar outras opções ou contactar diretamente o capitão.`);
                    
                    // Redirecionar
                    window.location.href = 'index.html';
                }, 1000);
            }, 1500);
        });
    }
}

// ============================================
// UTILITÁRIOS
// ============================================
function formatarDataPT(dataStr) {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Exportar funções
window.mesAnterior = mesAnterior;
window.mesSeguinte = mesSeguinte;
window.hoje = hoje;
window.removerDia = removerDia;
window.abrirModalReserva = abrirModalReserva;