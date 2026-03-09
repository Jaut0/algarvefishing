// ============================================
// ⚠️ VOCÊ PRECISA EDITAR ESTE FICHEIRO! ⚠️
// ============================================
//
// COPIE OS IDs QUE VOCÊ ANOTOU NO BLOCO DE NOTAS
// E SUBSTITUA NAS LINHAS ABAIXO:

const EMAIL_CONFIG = {
    // ✅ SERVICE ID CONFIGURADO
    serviceID: 'service_6xtr4m6',
    
    // ✅ TEMPLATE IDs CONFIGURADOS
    templates: {
        ativacaoCapitao: 'template_gkxn46b',  // Template universal de ativação
        ativacaoCliente: 'template_gkxn46b',  // Usa o mesmo template
        reservaCapitao: 'template_8qed1z9',   // Template de reserva para capitão
        reservaCliente: 'template_8qed1z9',   // Template de reserva para cliente
        suporte: 'template_8qed1z9'           // Usa template de reserva
    },
    
    // ✅ PUBLIC KEY CONFIGURADA
    publicKey: 'BYGLD8ycKDy2VyUVy',
    
    // ✅ NÃO PRECISA MEXER AQUI EMBAIXO ✅
    emails: {
        noreply: 'noreply@algarvetunacharter.pt',
        admin: 'admin@algarvetunacharter.pt',
        reservas: 'reservas@algarvetunacharter.pt',
        suporte: 'suporte@algarvetunacharter.pt',
        capitao: 'capitao@algarvetunacharter.pt'
    }
};

// ============================================
// ✅ NÃO MEXA DAQUI PARA BAIXO ✅
// ============================================

/**
 * Inicializar EmailJS
 */
function initEmailJS() {
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS não carregado! Adicione o script: https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');
        return false;
    }
    
    emailjs.init(EMAIL_CONFIG.publicKey);
    console.log('✅ EmailJS inicializado com Public Key:', EMAIL_CONFIG.publicKey);
    return true;
}

// ⚡ INICIALIZAR AUTOMATICAMENTE QUANDO O SCRIPT CARREGAR
if (typeof emailjs !== 'undefined') {
    initEmailJS();
} else {
    // Se o EmailJS ainda não carregou, tentar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEmailJS);
    } else {
        // Tentar após 500ms
        setTimeout(initEmailJS, 500);
    }
}

/**
 * Enviar Email de Ativação de Capitão
 */
async function enviarEmailAtivacaoCapitao(dados, token) {
    const linkAtivacao = `${window.location.origin}/ativar-conta.html?token=${token}`;
    
    const params = {
        to_email: dados.email,
        from_name: 'Algarve Charter',
        reply_to: EMAIL_CONFIG.emails.noreply,
        nome_usuario: dados.nome,  // ← Nome genérico
        link_ativacao: linkAtivacao,
        token_ativacao: token
    };
    
    try {
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templates.ativacaoCapitao,
            params
        );
        console.log('✅ Email de ativação enviado para:', dados.email);
        return { success: true, response };
    } catch (error) {
        console.error('❌ Erro ao enviar email de ativação:', error);
        return { success: false, error };
    }
}

/**
 * Enviar Email de Ativação de Cliente
 */
async function enviarEmailAtivacaoCliente(dados, token) {
    const linkAtivacao = `${window.location.origin}/ativar-conta.html?token=${token}`;
    
    const params = {
        to_email: dados.email,
        from_name: 'Algarve Charter',
        reply_to: EMAIL_CONFIG.emails.noreply,
        nome_usuario: dados.nome,  // ← Nome genérico
        link_ativacao: linkAtivacao,
        token_ativacao: token
    };
    
    try {
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templates.ativacaoCliente,
            params
        );
        console.log('✅ Email de ativação enviado para:', dados.email);
        return { success: true, response };
    } catch (error) {
        console.error('❌ Erro ao enviar email de ativação:', error);
        return { success: false, error };
    }
}

/**
 * Enviar Email de Nova Reserva (para Capitão)
 */
async function enviarEmailReservaCapitao(dados) {
    const params = {
        to_email: dados.capitaoEmail,
        from_name: 'Algarve Charter - Reservas',
        reply_to: dados.clienteEmail,
        tipo_notificacao: 'Nova Reserva',
        titulo_email: '🚤 NOVA RESERVA RECEBIDA!',
        nome_destinatario: dados.capitaoNome,
        mensagem_principal: 'Você recebeu uma nova reserva na plataforma Algarve Charter.',
        cliente_nome: dados.clienteNome,
        cliente_email: dados.clienteEmail,
        cliente_telefone: dados.clienteTelefone,
        barco_nome: dados.barcoNome,
        capitao_nome: dados.capitaoNome,
        datas_selecionadas: dados.datasSelecionadas,
        num_pescadores: dados.numPescadores,
        mensagem_cliente: dados.mensagem || 'Sem mensagem adicional',
        data_pedido: new Date().toLocaleString('pt-PT'),
        link_dashboard: window.location.origin + '/dashboard-capitao.html'
    };
    
    try {
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templates.reservaCapitao,
            params
        );
        console.log('✅ Email de reserva enviado ao capitão:', dados.capitaoEmail);
        return { success: true, response };
    } catch (error) {
        console.error('❌ Erro ao enviar email ao capitão:', error);
        return { success: false, error };
    }
}

/**
 * Enviar Email de Confirmação de Reserva (para Cliente)
 */
async function enviarEmailReservaCliente(dados) {
    const params = {
        to_email: dados.clienteEmail,
        from_name: 'Algarve Charter',
        reply_to: EMAIL_CONFIG.emails.reservas,
        tipo_notificacao: 'Confirmação de Reserva',
        titulo_email: '✅ RESERVA ENVIADA COM SUCESSO!',
        nome_destinatario: dados.clienteNome,
        mensagem_principal: 'Sua reserva foi enviada ao capitão. Ele entrará em contacto em até 48 horas.',
        cliente_nome: dados.clienteNome,
        cliente_email: dados.clienteEmail,
        cliente_telefone: dados.clienteTelefone || 'Não fornecido',
        barco_nome: dados.barcoNome,
        capitao_nome: dados.capitaoNome,
        datas_selecionadas: dados.datasSelecionadas,
        num_pescadores: dados.numPescadores,
        mensagem_cliente: dados.mensagem || 'Sem mensagem adicional',
        data_pedido: new Date().toLocaleString('pt-PT'),
        link_dashboard: window.location.origin + '/dashboard-usuario.html'
    };
    
    try {
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templates.reservaCliente,
            params
        );
        console.log('✅ Email de confirmação enviado ao cliente:', dados.clienteEmail);
        return { success: true, response };
    } catch (error) {
        console.error('❌ Erro ao enviar email ao cliente:', error);
        return { success: false, error };
    }
}

/**
 * Enviar Email de Suporte
 */
async function enviarEmailSuporte(dados) {
    const params = {
        to_email: EMAIL_CONFIG.emails.suporte,
        from_name: dados.nome,
        reply_to: dados.email,
        user_nome: dados.nome,
        user_email: dados.email,
        user_telefone: dados.telefone || 'Não fornecido',
        assunto: dados.assunto,
        mensagem: dados.mensagem,
        data_envio: new Date().toLocaleString('pt-PT')
    };
    
    try {
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templates.suporte,
            params
        );
        console.log('✅ Email de suporte enviado:', response);
        return { success: true, response };
    } catch (error) {
        console.error('❌ Erro ao enviar email de suporte:', error);
        return { success: false, error };
    }
}

// Exportar configuração e funções
window.EMAIL_CONFIG = EMAIL_CONFIG;
window.initEmailJS = initEmailJS;
window.enviarEmailAtivacaoCapitao = enviarEmailAtivacaoCapitao;
window.enviarEmailAtivacaoCliente = enviarEmailAtivacaoCliente;
window.enviarEmailReservaCapitao = enviarEmailReservaCapitao;
window.enviarEmailReservaCliente = enviarEmailReservaCliente;
window.enviarEmailSuporte = enviarEmailSuporte;
