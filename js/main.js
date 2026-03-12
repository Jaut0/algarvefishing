// Versão do portal
const SITE_VERSION = 'v1.20';

// ============================================
// FishingHub - JavaScript Principal
// ============================================

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    limparDadosMockAntigos(); // 🧹 LIMPEZA AUTOMÁTICA
    initHeader();
    initMobileMenu();
    initScrollAnimations();
});

// ============================================
// 🧹 LIMPEZA AUTOMÁTICA DE DADOS MOCK
// ============================================
function limparDadosMockAntigos() {
    // Lista de chaves que podem conter dados mock
    const chavesParaLimpar = [
        'barcosMock',
        'saidasMock',
        'viagensMock',
        'capitaesMock',
        'clientesMock',
        'emailsSimulados'
    ];
    
    // Remover chaves mock
    chavesParaLimpar.forEach(chave => {
        if (localStorage.getItem(chave)) {
            localStorage.removeItem(chave);
            console.log(`🧹 Removido: ${chave}`);
        }
    });
    
    // Limpar utilizadores mock antigos (manter apenas registos reais recentes)
    const utilizadores = JSON.parse(localStorage.getItem('utilizadores') || '[]');
    const hojeTimestamp = new Date().setHours(0, 0, 0, 0);
    const utilizadoresReais = utilizadores.filter(user => {
        // Manter se foi criado hoje OU se tem emailConfirmado = true (registo real)
        const criadoHoje = user.dataCriacao && new Date(user.dataCriacao).setHours(0, 0, 0, 0) === hojeTimestamp;
        const emailConfirmado = user.emailConfirmado === true || user.status === 'ativo';
        return criadoHoje || emailConfirmado;
    });
    
    if (utilizadores.length !== utilizadoresReais.length) {
        localStorage.setItem('utilizadores', JSON.stringify(utilizadoresReais));
        console.log(`🧹 Utilizadores: ${utilizadores.length} → ${utilizadoresReais.length}`);
    }
}


// ============================================
// HEADER SCROLL
// ============================================
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }
    });
}

// ============================================
// MENU MOBILE
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('ativo');
        navMenu.classList.toggle('ativo');
    });
    
    // Fechar menu ao clicar num link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('ativo');
            navMenu.classList.remove('ativo');
        });
    });
}

// ============================================
// ANIMAÇÕES DE SCROLL
// ============================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ============================================
// SISTEMA DE NOTIFICAÇÕES TOAST
// ============================================
function mostrarToast(mensagem, tipo = 'sucesso') {
    const existente = document.querySelector('.toast');
    if (existente) existente.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    
    const iconeMap = {
        sucesso: 'fa-check-circle',
        erro: 'fa-times-circle',
        aviso: 'fa-exclamation-triangle'
    };
    
    toast.innerHTML = `
        <i class="fas ${iconeMap[tipo]} toast-icon"></i>
        <span>${mensagem}</span>
        <i class="fas fa-times toast-fechar"></i>
    `;
    
    document.body.appendChild(toast);
    
    // Fechar ao clicar
    toast.querySelector('.toast-fechar').addEventListener('click', () => {
        toast.remove();
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// ✅ ALIAS PARA COMPATIBILIDADE (suporte.js usa showToast)
window.showToast = mostrarToast;

// ============================================
// MODAL
// ============================================
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('ativo');
        document.body.style.overflow = 'hidden';
    }
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('ativo');
        document.body.style.overflow = '';
    }
}

// Fechar modal ao clicar fora
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('ativo');
        document.body.style.overflow = '';
    }
});

// ============================================
// VALIDAÇÃO DE FORMULÁRIOS
// ============================================
function validarCampo(campo) {
    const valor = campo.value.trim();
    let valido = true;
    let mensagemErro = '';
    
    // Campo obrigatório
    if (campo.required && !valor) {
        valido = false;
        mensagemErro = 'Este campo é obrigatório';
    }
    
    // Email
    if (campo.type === 'email' && valor) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(valor)) {
            valido = false;
            mensagemErro = 'Email inválido';
        }
    }
    
    // Telefone
    if (campo.type === 'tel' && valor) {
        const telefoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!telefoneRegex.test(valor)) {
            valido = false;
            mensagemErro = 'Telefone inválido';
        }
    }
    
    // Número mínimo
    if (campo.type === 'number' && campo.min && valor < campo.min) {
        valido = false;
        mensagemErro = `Valor mínimo: ${campo.min}`;
    }
    
    // Aplicar estilos
    if (valido) {
        campo.classList.remove('erro');
        const erroEl = campo.parentElement.querySelector('.form-erro');
        if (erroEl) erroEl.style.display = 'none';
    } else {
        campo.classList.add('erro');
        let erroEl = campo.parentElement.querySelector('.form-erro');
        if (!erroEl) {
            erroEl = document.createElement('div');
            erroEl.className = 'form-erro';
            campo.parentElement.appendChild(erroEl);
        }
        erroEl.textContent = mensagemErro;
        erroEl.style.display = 'block';
    }
    
    return valido;
}

function validarFormulario(form) {
    const campos = form.querySelectorAll('input[required], textarea[required], select[required]');
    let formularioValido = true;
    
    campos.forEach(campo => {
        if (!validarCampo(campo)) {
            formularioValido = false;
        }
    });
    
    return formularioValido;
}

// ============================================
// LOADING SPINNER
// ============================================
function mostrarLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'spinner-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(overlay);
}

function esconderLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.remove();
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// UTILITÁRIOS
// ============================================
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatarPreco(preco) {
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR'
    }).format(preco);
}

function formatarTelefone(telefone) {
    return telefone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
}

// Exportar funções globais
window.mostrarToast = mostrarToast;
window.abrirModal = abrirModal;
window.fecharModal = fecharModal;
window.validarFormulario = validarFormulario;
window.mostrarLoading = mostrarLoading;
window.esconderLoading = esconderLoading;