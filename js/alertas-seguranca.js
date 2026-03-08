// ========================================
// ALERTAS DE SEGURANÇA - SISTEMA DE INCIDENTES
// Exclusivo para Capitães
// ========================================

// Dados mock de exemplo (em produção viriam de uma API/Database)
const alertasMock = [
    {
        id: 'ALT001',
        nomeCliente: 'João Manuel Silva',
        emailCliente: 'joao.silva.fake@email.com',
        telefoneCliente: '+351 912 345 678',
        gravidade: 'critico',
        categorias: ['nao-pagamento', 'comportamento'],
        descricao: 'Cliente reservou saída de 3 dias para pesca ao atum (€1.500). No primeiro dia apresentou comportamento agressivo com a tripulação após consumir álcool. No segundo dia cancelou alegando "condições meteorológicas" (tempo estava perfeito) e recusou-se a pagar. Quando confrontado, tornou-se hostil e ameaçador. Testemunhas: 2 tripulantes. Tentei resolver amigavelmente mas cliente bloqueou contacto.',
        dataIncidente: '2026-02-15',
        dataReporte: '2026-02-16',
        reportadoPor: 'Cap. Pedro Costa',
        barco: 'Blue Marlin Hunter',
        verificado: true
    },
    {
        id: 'ALT002',
        nomeCliente: 'Carlos Mendes',
        emailCliente: 'c.mendes.falso@email.com',
        telefoneCliente: '+351 918 765 432',
        gravidade: 'alto',
        categorias: ['danos', 'embriaguez'],
        descricao: 'Durante saída de pesca ao marlim, cliente apresentou-se em estado de embriaguez. Causou danos em 2 canas de pesca profissionais (€800 cada) e partiu o sistema de rádiocomunicação (€450). Recusou assumir responsabilidade pelos danos. Tinha seguro mas empresa recusou cobertura devido a estado de embriaguez comprovado. Processo judicial em curso.',
        dataIncidente: '2026-02-28',
        dataReporte: '2026-03-01',
        reportadoPor: 'Cap. Ana Rodrigues',
        barco: 'Atlantic Warrior',
        verificado: true
    },
    {
        id: 'ALT003',
        nomeCliente: 'Miguel Ferreira',
        emailCliente: 'miguelf.fake@gmail.com',
        telefoneCliente: '+351 965 123 789',
        gravidade: 'medio',
        categorias: ['cancelamento'],
        descricao: 'Cliente fez reserva para grupo de 6 pessoas (saída de jigging profundo, €2.100). Confirmou 2 dias antes. No dia da saída, 1 hora antes do horário marcado, enviou SMS a cancelar sem qualquer justificação. Política de cancelamento clara no contrato: menos de 48h = 50% reembolso. Cliente exigiu reembolso total e deixou avaliação negativa falsa online. Recusei novos pedidos deste cliente.',
        dataIncidente: '2026-03-05',
        dataReporte: '2026-03-05',
        reportadoPor: 'Cap. Rui Almeida',
        barco: 'Tuna King',
        verificado: false
    },
    {
        id: 'ALT004',
        nomeCliente: 'André Costa',
        emailCliente: 'andre.c.fake@hotmail.com',
        telefoneCliente: '+351 932 456 123',
        gravidade: 'baixo',
        categorias: ['comportamento'],
        descricao: 'Cliente chegou 45 minutos atrasado (hora de partida: 6h00, chegou às 6h45). Atrasou toda a expedição. Durante a saída fez comentários desrespeitosos sobre a tripulação. Não seguiu instruções de segurança básicas mesmo após aviso. No final reclamou que "não apanhou peixe grande" (condições de mar eram médias, avisado previamente). Deixou avaliação de 2 estrelas. Não recomendo mas não é caso grave.',
        dataIncidente: '2026-03-03',
        dataReporte: '2026-03-04',
        reportadoPor: 'Cap. Teresa Santos',
        barco: 'Ocean Hunter',
        verificado: false
    }
];

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacaoCapitao();
    carregarAlertas();
    atualizarEstatisticas();
    configurarTabs();
    configurarFiltros();
    configurarFormulario();
    configurarDataMaxima();
});

// ========================================
// AUTENTICAÇÃO
// ========================================
function verificarAutenticacaoCapitao() {
    // Em produção, verificar se o usuário é capitão aprovado
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    
    if (!usuario.tipo || usuario.tipo !== 'capitao') {
        mostrarToast('Acesso negado. Área restrita a capitães.', 'erro');
        setTimeout(() => {
            window.location.href = 'auth.html';
        }, 2000);
        return false;
    }
    
    if (usuario.status !== 'aprovado') {
        mostrarToast('Conta de capitão ainda não aprovada.', 'aviso');
        setTimeout(() => {
            window.location.href = 'dashboard-capitao.html';
        }, 2000);
        return false;
    }
    
    return true;
}

// ========================================
// CARREGAR E EXIBIR ALERTAS
// ========================================
function carregarAlertas(filtros = {}) {
    let alertas = obterAlertasLocalStorage();
    
    // Aplicar filtros
    if (filtros.nome) {
        const termo = filtros.nome.toLowerCase();
        alertas = alertas.filter(a => 
            a.nomeCliente.toLowerCase().includes(termo) ||
            a.emailCliente.toLowerCase().includes(termo) ||
            a.telefoneCliente.includes(termo)
        );
    }
    
    if (filtros.gravidade) {
        alertas = alertas.filter(a => a.gravidade === filtros.gravidade);
    }
    
    if (filtros.categoria) {
        alertas = alertas.filter(a => a.categorias.includes(filtros.categoria));
    }
    
    // Ordenar por data (mais recentes primeiro)
    alertas.sort((a, b) => new Date(b.dataReporte) - new Date(a.dataReporte));
    
    renderizarAlertas(alertas);
}

function obterAlertasLocalStorage() {
    const alertasStorage = localStorage.getItem('alertasSeguranca');
    
    if (!alertasStorage) {
        // Primeira vez, carregar dados mock
        localStorage.setItem('alertasSeguranca', JSON.stringify(alertasMock));
        return alertasMock;
    }
    
    return JSON.parse(alertasStorage);
}

function renderizarAlertas(alertas) {
    const container = document.getElementById('listaAlertasContainer');
    
    if (alertas.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem; color: rgba(255,255,255,0.6);">
                <i class="fas fa-search" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <h3 style="color: var(--cor-branco); margin-bottom: 0.5rem;">Nenhum alerta encontrado</h3>
                <p>Não existem alertas com os filtros selecionados.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = alertas.map(alerta => `
        <div class="alerta-card ${alerta.gravidade}">
            <div class="alerta-header">
                <div class="alerta-info-cliente">
                    <div class="alerta-nome">
                        <i class="fas fa-user-circle"></i> ${alerta.nomeCliente}
                        ${alerta.verificado ? '<i class="fas fa-check-circle" style="color: #10B981; font-size: 0.9rem;" title="Alerta verificado"></i>' : ''}
                    </div>
                    <div class="alerta-contactos">
                        <span><i class="fas fa-envelope"></i> ${alerta.emailCliente}</span>
                        <span><i class="fas fa-phone"></i> ${alerta.telefoneCliente}</span>
                    </div>
                </div>
                <div class="badge-gravidade ${alerta.gravidade}">
                    ${obterIconeGravidade(alerta.gravidade)} ${alerta.gravidade.toUpperCase()}
                </div>
            </div>
            
            <div class="alerta-categorias">
                ${alerta.categorias.map(cat => `
                    <span class="badge"><i class="${obterIconeCategoria(cat)}"></i> ${formatarCategoria(cat)}</span>
                `).join('')}
            </div>
            
            <div class="alerta-descricao">
                ${alerta.descricao}
            </div>
            
            <div class="alerta-meta">
                <div class="alerta-reportado-por">
                    <i class="fas fa-user-shield"></i>
                    <span>Reportado por <strong>${alerta.reportadoPor}</strong> | ${alerta.barco}</span>
                </div>
                <div>
                    <i class="fas fa-calendar"></i> Incidente: ${formatarData(alerta.dataIncidente)}
                    <span style="margin: 0 0.5rem;">•</span>
                    <i class="fas fa-clock"></i> Reportado: ${formatarData(alerta.dataReporte)}
                </div>
            </div>
        </div>
    `).join('');
}

// ========================================
// ESTATÍSTICAS
// ========================================
function atualizarEstatisticas() {
    const alertas = obterAlertasLocalStorage();
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();
    
    const total = alertas.length;
    const criticos = alertas.filter(a => a.gravidade === 'critico').length;
    const esteMes = alertas.filter(a => {
        const dataReporte = new Date(a.dataReporte);
        return dataReporte.getMonth() === mesAtual && dataReporte.getFullYear() === anoAtual;
    }).length;
    
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statCriticos').textContent = criticos;
    document.getElementById('statMes').textContent = esteMes;
}

// ========================================
// TABS
// ========================================
function configurarTabs() {
    const tabs = document.querySelectorAll('.tab-alerta');
    const conteudos = document.querySelectorAll('.conteudo-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('ativo'));
            conteudos.forEach(c => c.classList.remove('ativo'));
            
            tab.classList.add('ativo');
            document.getElementById(`tab${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`).classList.add('ativo');
        });
    });
}

// ========================================
// FILTROS
// ========================================
function configurarFiltros() {
    const filtroNome = document.getElementById('filtroNome');
    const filtroGravidade = document.getElementById('filtroGravidade');
    const filtroCategoria = document.getElementById('filtroCategoria');
    
    const aplicarFiltros = () => {
        carregarAlertas({
            nome: filtroNome.value,
            gravidade: filtroGravidade.value,
            categoria: filtroCategoria.value
        });
    };
    
    filtroNome.addEventListener('input', aplicarFiltros);
    filtroGravidade.addEventListener('change', aplicarFiltros);
    filtroCategoria.addEventListener('change', aplicarFiltros);
}

// ========================================
// FORMULÁRIO DE REPORTE
// ========================================
function configurarFormulario() {
    const form = document.getElementById('formReportar');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validar categorias
        const categoriasSelecionadas = Array.from(document.querySelectorAll('input[name="categorias"]:checked'))
            .map(cb => cb.value);
        
        if (categoriasSelecionadas.length === 0) {
            mostrarToast('Selecione pelo menos uma categoria de incidente.', 'erro');
            return;
        }
        
        // Validar descrição mínima
        const descricao = document.getElementById('descricaoIncidente').value;
        if (descricao.length < 50) {
            mostrarToast('A descrição deve ter no mínimo 50 caracteres.', 'erro');
            return;
        }
        
        // Validar termos
        if (!document.getElementById('concordoTermos').checked) {
            mostrarToast('Deve concordar com a declaração de responsabilidade.', 'erro');
            return;
        }
        
        // Recolher dados
        const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
        const alertas = obterAlertasLocalStorage();
        
        const novoAlerta = {
            id: `ALT${String(alertas.length + 1).padStart(3, '0')}`,
            nomeCliente: document.getElementById('nomeCliente').value,
            emailCliente: document.getElementById('emailCliente').value,
            telefoneCliente: document.getElementById('telefoneCliente').value,
            gravidade: document.querySelector('input[name="gravidade"]:checked').value,
            categorias: categoriasSelecionadas,
            descricao: descricao,
            dataIncidente: document.getElementById('dataIncidente').value,
            dataReporte: new Date().toISOString().split('T')[0],
            reportadoPor: usuario.nome || 'Capitão',
            barco: usuario.barco || 'Não especificado',
            verificado: false
        };
        
        // Adicionar aos alertas
        alertas.unshift(novoAlerta); // Adiciona no início (mais recente)
        localStorage.setItem('alertasSeguranca', JSON.stringify(alertas));
        
        // Feedback
        mostrarToast('Alerta de segurança reportado com sucesso!', 'sucesso');
        
        // Limpar formulário e voltar para tab de consulta
        limparFormulario();
        document.querySelector('[data-tab="consultar"]').click();
        
        // Atualizar listagem e stats
        carregarAlertas();
        atualizarEstatisticas();
        
        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function limparFormulario() {
    document.getElementById('formReportar').reset();
    
    // Desselecionar todos os checkboxes de categoria
    document.querySelectorAll('input[name="categorias"]').forEach(cb => cb.checked = false);
    
    // Desselecionar radio de gravidade
    document.querySelectorAll('input[name="gravidade"]').forEach(radio => radio.checked = false);
}

function configurarDataMaxima() {
    const dataInput = document.getElementById('dataIncidente');
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.max = hoje;
    dataInput.value = hoje;
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================
function obterIconeGravidade(gravidade) {
    const icones = {
        'baixo': '🟢',
        'medio': '🟡',
        'alto': '🟠',
        'critico': '🔴'
    };
    return icones[gravidade] || '⚠️';
}

function obterIconeCategoria(categoria) {
    const icones = {
        'nao-pagamento': 'fas fa-money-bill-wave',
        'comportamento': 'fas fa-user-times',
        'danos': 'fas fa-wrench',
        'seguranca': 'fas fa-life-ring',
        'embriaguez': 'fas fa-glass-whiskey',
        'cancelamento': 'fas fa-ban',
        'outro': 'fas fa-ellipsis-h'
    };
    return icones[categoria] || 'fas fa-exclamation-circle';
}

function formatarCategoria(categoria) {
    const nomes = {
        'nao-pagamento': 'Não Pagamento',
        'comportamento': 'Comportamento',
        'danos': 'Danos',
        'seguranca': 'Segurança',
        'embriaguez': 'Embriaguez',
        'cancelamento': 'Cancelamento',
        'outro': 'Outro'
    };
    return nomes[categoria] || categoria;
}

function formatarData(dataString) {
    const data = new Date(dataString + 'T00:00:00');
    return data.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function logout() {
    if (confirm('Tem a certeza que deseja sair?')) {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'auth.html';
    }
}

// ========================================
// AUTO-REFRESH (opcional)
// ========================================
// Atualizar estatísticas a cada 60 segundos
setInterval(() => {
    atualizarEstatisticas();
}, 60000);
