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
        window.__err('❌ EmailJS não carregado! Adicione o script: https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');
        return false;
    }
    
    emailjs.init(EMAIL_CONFIG.publicKey);
    window.__log('✅ EmailJS inicializado com sucesso.');
    return true;
}

// --------------------------------------------
// i18n for email content (matches portal_lang)
// --------------------------------------------
function getPortalLang() {
    try {
        if (window.PortalI18n && typeof window.PortalI18n.getLang === 'function') {
            return window.PortalI18n.getLang();
        }
        const saved = localStorage.getItem('portal_lang');
        return (saved || 'pt').toLowerCase();
    } catch (_) {
        return 'pt';
    }
}

function getEmailLocale(lang) {
    const l = (lang || 'pt').toLowerCase();
    if (l.startsWith('en')) return 'en-GB';
    if (l.startsWith('fr')) return 'fr-FR';
    if (l.startsWith('de')) return 'de-DE';
    return 'pt-PT';
}

function emailTxt(key, lang) {
    const l = (lang || getPortalLang() || 'pt').toLowerCase();
    const D = {
        pt: {
            NOVA_RESERVA_TIPO: 'Nova Reserva',
            NOVA_RESERVA_TITULO: '🚤 NOVA RESERVA RECEBIDA!',
            NOVA_RESERVA_MSG: 'Você recebeu uma nova reserva na plataforma Algarve Charter.',

            RESERVA_ENVIADA_TIPO: 'Confirmação de Reserva',
            RESERVA_ENVIADA_TITULO: '✅ RESERVA ENVIADA COM SUCESSO!',
            RESERVA_ENVIADA_MSG: 'Sua reserva foi enviada ao capitão. Ele entrará em contacto em até 48 horas.',

            RESERVA_CONFIRMADA_TIPO: 'Reserva Confirmada',
            RESERVA_CONFIRMADA_TITULO: '✅ RESERVA CONFIRMADA!',
            RESERVA_CONFIRMADA_MSG: 'O capitão confirmou a sua reserva. Agora você já pode entrar em contacto direto para combinar os detalhes.',

            SEM_MSG: 'Sem mensagem adicional',
            NAO_FORNECIDO: 'Não fornecido'
        },
        en: {
            NOVA_RESERVA_TIPO: 'New booking request',
            NOVA_RESERVA_TITULO: '🚤 NEW BOOKING REQUEST!',
            NOVA_RESERVA_MSG: 'You have received a new booking request on Algarve Charter.',

            RESERVA_ENVIADA_TIPO: 'Booking request received',
            RESERVA_ENVIADA_TITULO: '✅ REQUEST SENT SUCCESSFULLY!',
            RESERVA_ENVIADA_MSG: 'Your request has been sent to the captain. They will contact you within 48 hours.',

            RESERVA_CONFIRMADA_TIPO: 'Booking confirmed',
            RESERVA_CONFIRMADA_TITULO: '✅ BOOKING CONFIRMED!',
            RESERVA_CONFIRMADA_MSG: 'The captain has confirmed your booking. You can now contact them directly to arrange the details.',

            SEM_MSG: 'No additional message',
            NAO_FORNECIDO: 'Not provided'
        },
        fr: {
            NOVA_RESERVA_TIPO: 'Nouvelle demande de réservation',
            NOVA_RESERVA_TITULO: '🚤 NOUVELLE RÉSERVATION !',
            NOVA_RESERVA_MSG: 'Vous avez reçu une nouvelle demande de réservation sur Algarve Charter.',

            RESERVA_ENVIADA_TIPO: 'Demande de réservation reçue',
            RESERVA_ENVIADA_TITULO: '✅ DEMANDE ENVOYÉE AVEC SUCCÈS !',
            RESERVA_ENVIADA_MSG: 'Votre demande a été envoyée au capitaine. Il vous contactera sous 48 heures.',

            RESERVA_CONFIRMADA_TIPO: 'Réservation confirmée',
            RESERVA_CONFIRMADA_TITULO: '✅ RÉSERVATION CONFIRMÉE !',
            RESERVA_CONFIRMADA_MSG: 'Le capitaine a confirmé votre réservation. Vous pouvez maintenant le contacter directement pour organiser les détails.',

            SEM_MSG: 'Aucun message supplémentaire',
            NAO_FORNECIDO: 'Non fourni'
        },
        de: {
            NOVA_RESERVA_TIPO: 'Neue Buchungsanfrage',
            NOVA_RESERVA_TITULO: '🚤 NEUE BUCHUNGSANFRAGE!',
            NOVA_RESERVA_MSG: 'Sie haben eine neue Buchungsanfrage auf Algarve Charter erhalten.',

            RESERVA_ENVIADA_TIPO: 'Buchungsanfrage eingegangen',
            RESERVA_ENVIADA_TITULO: '✅ ANFRAGE ERFOLGREICH GESENDET!',
            RESERVA_ENVIADA_MSG: 'Ihre Anfrage wurde an den Kapitän gesendet. Er wird Sie innerhalb von 48 Stunden kontaktieren.',

            RESERVA_CONFIRMADA_TIPO: 'Buchung bestätigt',
            RESERVA_CONFIRMADA_TITULO: '✅ BUCHUNG BESTÄTIGT!',
            RESERVA_CONFIRMADA_MSG: 'Der Kapitän hat Ihre Buchung bestätigt. Sie können ihn jetzt direkt kontaktieren, um die Details abzustimmen.',

            SEM_MSG: 'Keine zusätzliche Nachricht',
            NAO_FORNECIDO: 'Nicht angegeben'
        }
    };
    const base = D[l] || D.pt;
    return base[key] || D.pt[key] || key;
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
        window.__log('✅ Email de ativação enviado para:', dados.email);
        return { success: true, response };
    } catch (error) {
        window.__err('❌ Erro ao enviar email de ativação:', error);
        return { success: false, error };
    }
}

/**
 * Enviar Email de Ativação de Cliente
 */
async function enviarEmailAtivacaoCliente(dados, token) {
    const linkAtivacao = `${window.location.origin}/confirmar-email.html?token=${token}`;
    
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
        window.__log('✅ Email de ativação enviado para:', dados.email);
        return { success: true, response };
    } catch (error) {
        window.__err('❌ Erro ao enviar email de ativação:', error);
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
        tipo_notificacao: emailTxt('NOVA_RESERVA_TIPO'),
        titulo_email: emailTxt('NOVA_RESERVA_TITULO'),
        nome_destinatario: dados.capitaoNome,
        mensagem_principal: emailTxt('NOVA_RESERVA_MSG'),
        cliente_nome: dados.clienteNome,
        cliente_email: dados.clienteEmail,
        cliente_telefone: dados.clienteTelefone,
        barco_nome: dados.barcoNome,
        capitao_nome: dados.capitaoNome,
        datas_selecionadas: dados.datasSelecionadas,
        num_pescadores: dados.numPescadores,
        mensagem_cliente: dados.mensagem || emailTxt('SEM_MSG'),
        data_pedido: new Date().toLocaleString(getEmailLocale(getPortalLang())),
        link_dashboard: window.location.origin + '/dashboard-capitao.html'
    };
    
    try {
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templates.reservaCapitao,
            params
        );
        window.__log('✅ Email de reserva enviado ao capitão:', dados.capitaoEmail);
        return { success: true, response };
    } catch (error) {
        window.__err('❌ Erro ao enviar email ao capitão:', error);
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
        tipo_notificacao: emailTxt('RESERVA_ENVIADA_TIPO'),
        titulo_email: emailTxt('RESERVA_ENVIADA_TITULO'),
        nome_destinatario: dados.clienteNome,
        mensagem_principal: emailTxt('RESERVA_ENVIADA_MSG'),
        cliente_nome: dados.clienteNome,
        cliente_email: dados.clienteEmail,
        cliente_telefone: dados.clienteTelefone || emailTxt('NAO_FORNECIDO'),
        barco_nome: dados.barcoNome,
        capitao_nome: dados.capitaoNome,
        datas_selecionadas: dados.datasSelecionadas,
        num_pescadores: dados.numPescadores,
        mensagem_cliente: dados.mensagem || emailTxt('SEM_MSG'),
        data_pedido: new Date().toLocaleString(getEmailLocale(getPortalLang())),
        link_dashboard: window.location.origin + '/dashboard-usuario.html'
    };
    
    try {
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templates.reservaCliente,
            params
        );
        window.__log('✅ Email de confirmação enviado ao cliente:', dados.clienteEmail);
        return { success: true, response };
    } catch (error) {
        window.__err('❌ Erro ao enviar email ao cliente:', error);
        return { success: false, error };
    }
}

/**
 * Enviar Email: Reserva Confirmada (para Cliente)
 * Dispara quando o Capitão CONFIRMA uma reserva.
 */
async function enviarEmailReservaAceiteCliente(dados) {
    const telRaw = (dados.capitaoTelefone || '').toString();
    const digits = telRaw.replace(/[^0-9]/g, '');
    let wa = digits;
    if (wa.length === 9) wa = '351' + wa;

    const linkWhatsApp = wa ? `https://wa.me/${wa}` : '';

    const params = {
        to_email: dados.clienteEmail,
        from_name: 'Algarve Charter - Reservas',
        reply_to: EMAIL_CONFIG.emails.reservas,
        tipo_notificacao: emailTxt('RESERVA_CONFIRMADA_TIPO'),
        titulo_email: emailTxt('RESERVA_CONFIRMADA_TITULO'),
        nome_destinatario: dados.clienteNome,
        mensagem_principal: emailTxt('RESERVA_CONFIRMADA_MSG'),
        cliente_nome: dados.clienteNome,
        cliente_email: dados.clienteEmail,
        cliente_telefone: dados.clienteTelefone || emailTxt('NAO_FORNECIDO'),
        barco_nome: dados.barcoNome || '—',
        capitao_nome: dados.capitaoNome || 'Capitão',
        datas_selecionadas: dados.datasSelecionadas || '—',
        num_pescadores: dados.numPescadores || 1,
        mensagem_cliente: `Contacto do capitão (WhatsApp): ${telRaw || '—'}${linkWhatsApp ? `\n${linkWhatsApp}` : ''}`,
        data_pedido: new Date().toLocaleString(getEmailLocale(getPortalLang())),
        link_dashboard: window.location.origin + '/dashboard-usuario.html'
    };

    try {
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templates.reservaCliente,
            params
        );
        window.__log('✅ Email de reserva confirmada enviado ao cliente:', dados.clienteEmail);
        return { success: true, response };
    } catch (error) {
        window.__err('❌ Erro ao enviar email de reserva confirmada ao cliente:', error);
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
        data_envio: new Date().toLocaleString(getEmailLocale(getPortalLang()))
    };
    
    try {
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templates.suporte,
            params
        );
        window.__log('✅ Email de suporte enviado:', response);
        return { success: true, response };
    } catch (error) {
        window.__err('❌ Erro ao enviar email de suporte:', error);
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
window.enviarEmailReservaAceiteCliente = enviarEmailReservaAceiteCliente;
window.enviarEmailSuporte = enviarEmailSuporte;

/**
 * Enviar Email de Conta Ativada (para Cliente - pelo Admin)
 */
async function enviarEmailContaAtivadaCliente(cliente) {
    const params = {
        to_email: cliente.email,
        from_name: 'Algarve Tuna Charter',
        reply_to: EMAIL_CONFIG.emails.noreply,
        tipo_notificacao: 'Conta Ativada',
        titulo_email: '✅ A SUA CONTA FOI ATIVADA!',
        nome_destinatario: cliente.nome,
        nome_usuario: cliente.nome,
        mensagem_principal: 'A sua conta na Algarve Tuna Charter foi ativada pela nossa equipa de administração.',
        link_ativacao: window.location.origin + '/auth.html',
        token_ativacao: '',
        data_ativacao: new Date().toLocaleString(getEmailLocale(getPortalLang())),
        link_dashboard: window.location.origin + '/dashboard-usuario.html'
    };

    // Guardar email simulado (como backup sempre funcional)
    let emailsSimulados = JSON.parse(localStorage.getItem('emailsSimulados') || '[]');
    emailsSimulados.push({
        id: 'EMAIL_' + Date.now(),
        para: cliente.email,
        assunto: '✅ Conta Ativada - Algarve Tuna Charter',
        corpo: `
Olá ${cliente.nome},

A sua conta na Algarve Tuna Charter foi ativada com sucesso!

📋 Detalhes da Conta:
• Nome: ${cliente.nome}
• Email: ${cliente.email}
• Data de Ativação: ${new Date().toLocaleString(getEmailLocale(getPortalLang()))}

🎉 O que pode fazer agora:
• Explorar as saídas de pesca disponíveis
• Fazer reservas com os nossos capitães
• Gerir o seu perfil no dashboard

🔗 Faça login aqui:
${window.location.origin}/auth.html

Bem-vindo à Algarve Tuna Charter!

---
Equipa Algarve Tuna Charter
Big Game Fishing no Algarve
📧 suporte@algarvetunacharter.pt
📞 +351 289 123 456
        `.trim(),
        dataEnvio: new Date().toISOString(),
        lido: false
    });
    localStorage.setItem('emailsSimulados', JSON.stringify(emailsSimulados));

    // Tentar enviar via EmailJS
    try {
        if (typeof emailjs === 'undefined') throw new Error('EmailJS não disponível');
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templates.ativacaoCliente,
            params
        );
        window.__log('✅ Email de ativação de conta enviado ao cliente:', cliente.email);
        return { success: true, response };
    } catch (error) {
        console.warn('⚠️ EmailJS falhou (email guardado localmente):', error);
        return { success: false, error, savedLocally: true };
    }
}

window.enviarEmailContaAtivadaCliente = enviarEmailContaAtivadaCliente;
