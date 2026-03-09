// ============================================
// SISTEMA DE LIMPEZA AUTOMÁTICA DE TOKENS
// ============================================

/**
 * Limpar tokens expirados do localStorage
 * Executar automaticamente em cada página
 */
function limparTokensExpirados() {
    try {
        const pendentesStr = localStorage.getItem('usuariosPendentes') || '[]';
        const pendentes = JSON.parse(pendentesStr);
        const agora = new Date();
        
        // Filtrar apenas usuários cujo token ainda não expirou
        const ativos = pendentes.filter(usuario => {
            const expiracao = new Date(usuario.expiracaoToken);
            return agora <= expiracao;
        });
        
        const removidos = pendentes.length - ativos.length;
        
        if (removidos > 0) {
            console.log(`🧹 Limpeza automática: ${removidos} token(s) expirado(s) removido(s)`);
            localStorage.setItem('usuariosPendentes', JSON.stringify(ativos));
        } else {
            console.log('✅ Nenhum token expirado encontrado');
        }
        
        return { removidos, restantes: ativos.length };
    } catch (error) {
        console.error('❌ Erro ao limpar tokens:', error);
        return { removidos: 0, restantes: 0 };
    }
}

/**
 * Verificar se há muitos tokens pendentes (alertar admin)
 */
function verificarTokensPendentes() {
    try {
        const pendentesStr = localStorage.getItem('usuariosPendentes') || '[]';
        const pendentes = JSON.parse(pendentesStr);
        
        if (pendentes.length > 50) {
            console.warn(`⚠️ ALERTA: ${pendentes.length} tokens pendentes no sistema!`);
            console.warn('Considere revisar se os emails estão sendo enviados corretamente.');
        }
        
        return pendentes.length;
    } catch (error) {
        console.error('❌ Erro ao verificar tokens:', error);
        return 0;
    }
}

/**
 * Estatísticas do sistema
 */
function estatisticasAtivacao() {
    try {
        const utilizadores = JSON.parse(localStorage.getItem('utilizadores') || '[]');
        const pendentes = JSON.parse(localStorage.getItem('usuariosPendentes') || '[]');
        
        const stats = {
            usuariosAtivos: utilizadores.length,
            usuariosPendentes: pendentes.length,
            capitaesAtivos: utilizadores.filter(u => u.tipo === 'capitao' && u.status === 'ativo').length,
            clientesAtivos: utilizadores.filter(u => u.tipo !== 'capitao' && u.status === 'ativo').length,
            capitaesPendentes: pendentes.filter(u => u.tipo === 'capitao').length,
            clientesPendentes: pendentes.filter(u => u.tipo !== 'capitao').length
        };
        
        console.table(stats);
        return stats;
    } catch (error) {
        console.error('❌ Erro ao obter estatísticas:', error);
        return null;
    }
}

/**
 * Forçar ativação manual de uma conta (ADMIN)
 * Útil se o email não chegar
 */
function ativarContaManualmente(email) {
    try {
        const pendentesStr = localStorage.getItem('usuariosPendentes') || '[]';
        const pendentes = JSON.parse(pendentesStr);
        
        const usuario = pendentes.find(u => u.email === email);
        
        if (!usuario) {
            console.error(`❌ Usuário ${email} não encontrado na lista de pendentes`);
            return false;
        }
        
        // Atualizar status
        usuario.status = 'ativo';
        usuario.dataAtivacao = new Date().toISOString();
        delete usuario.token;
        delete usuario.expiracaoToken;
        
        // Adicionar à lista de ativos
        const utilizadores = JSON.parse(localStorage.getItem('utilizadores') || '[]');
        utilizadores.push(usuario);
        localStorage.setItem('utilizadores', JSON.stringify(utilizadores));
        
        // Remover da lista de pendentes
        const novosPendentes = pendentes.filter(u => u.email !== email);
        localStorage.setItem('usuariosPendentes', JSON.stringify(novosPendentes));
        
        console.log(`✅ Conta ${email} ativada manualmente com sucesso!`);
        return true;
    } catch (error) {
        console.error('❌ Erro ao ativar conta:', error);
        return false;
    }
}

// ============================================
// EXECUTAR AUTOMATICAMENTE
// ============================================

// Executar limpeza ao carregar qualquer página
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        // Executar limpeza
        limparTokensExpirados();
        
        // Verificar tokens pendentes
        verificarTokensPendentes();
    });
    
    // Executar limpeza a cada 30 minutos
    setInterval(limparTokensExpirados, 30 * 60 * 1000);
}

// Exportar funções para uso no console (admin)
if (typeof window !== 'undefined') {
    window.limparTokensExpirados = limparTokensExpirados;
    window.verificarTokensPendentes = verificarTokensPendentes;
    window.estatisticasAtivacao = estatisticasAtivacao;
    window.ativarContaManualmente = ativarContaManualmente;
}

console.log('🧹 Sistema de limpeza automática carregado!');
console.log('💡 Comandos disponíveis no console:');
console.log('   - limparTokensExpirados()');
console.log('   - verificarTokensPendentes()');
console.log('   - estatisticasAtivacao()');
console.log('   - ativarContaManualmente("email@exemplo.com")');
