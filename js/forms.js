// ============================================
// FishingHub - JavaScript para Formulários Multi-Step
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMultiStepForm();
    initUploadFotos();
});

// ============================================
// FORMULÁRIO MULTI-STEP
// ============================================
let currentStep = 1;
let totalSteps = 0;

function initMultiStepForm() {
    const formSteps = document.querySelectorAll('.form-step');
    const formStepConteudos = document.querySelectorAll('.form-step-conteudo');
    const btnProximo = document.getElementById('btnProximo');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSubmit = document.getElementById('btnSubmit');
    
    if (formSteps.length === 0) return;
    
    totalSteps = formSteps.length;
    
    // Botão Próximo
    if (btnProximo) {
        btnProximo.addEventListener('click', () => {
            if (validarStepAtual()) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    atualizarStep();
                }
            }
        });
    }
    
    // Botão Anterior
    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                atualizarStep();
            }
        });
    }
    
    // Submit Form
    const form = document.querySelector('.form-multistep form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validarStepAtual()) {
                submeterFormulario();
            }
        });
    }
    
    atualizarStep();
}

function atualizarStep() {
    const formSteps = document.querySelectorAll('.form-step');
    const formStepConteudos = document.querySelectorAll('.form-step-conteudo');
    const btnProximo = document.getElementById('btnProximo');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSubmit = document.getElementById('btnSubmit');
    const progresso = document.querySelector('.form-steps-progresso');
    
    // Atualizar steps visuais
    formSteps.forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completo');
            step.classList.remove('ativo');
        } else if (index + 1 === currentStep) {
            step.classList.add('ativo');
            step.classList.remove('completo');
        } else {
            step.classList.remove('ativo', 'completo');
        }
    });
    
    // Atualizar conteúdos
    formStepConteudos.forEach((conteudo, index) => {
        if (index + 1 === currentStep) {
            conteudo.classList.add('ativo');
        } else {
            conteudo.classList.remove('ativo');
        }
    });
    
    // Atualizar barra de progresso
    if (progresso) {
        const progressoPercentagem = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progresso.style.width = progressoPercentagem + '%';
    }
    
    // Atualizar botões
    if (btnAnterior) {
        btnAnterior.style.display = currentStep === 1 ? 'none' : 'inline-flex';
    }
    
    if (btnProximo && btnSubmit) {
        if (currentStep === totalSteps) {
            btnProximo.style.display = 'none';
            btnSubmit.style.display = 'inline-flex';
        } else {
            btnProximo.style.display = 'inline-flex';
            btnSubmit.style.display = 'none';
        }
    }
    
    // Scroll para o topo do formulário
    const formMultistep = document.querySelector('.form-multistep');
    if (formMultistep) {
        formMultistep.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function validarStepAtual() {
    const stepAtual = document.querySelector(`.form-step-conteudo:nth-child(${currentStep})`);
    if (!stepAtual) return true;
    
    const camposObrigatorios = stepAtual.querySelectorAll('[required]');
    let valido = true;
    
    camposObrigatorios.forEach(campo => {
        // Validar checkboxes visuais
        if (campo.type === 'checkbox' && campo.hasAttribute('data-min-required')) {
            const minRequired = parseInt(campo.getAttribute('data-min-required'));
            const grupo = campo.getAttribute('name');
            const checkboxesMarcados = stepAtual.querySelectorAll(`[name="${grupo}"]:checked`).length;
            
            if (checkboxesMarcados < minRequired) {
                valido = false;
                mostrarToast(`Selecione pelo menos ${minRequired} opção(ões)`, 'erro');
                return;
            }
        }
        
        // Validar campos de texto, select, etc.
        if (campo.type !== 'checkbox' && campo.type !== 'radio') {
            if (!campo.value.trim()) {
                valido = false;
                campo.classList.add('erro');
                
                let erroEl = campo.parentElement.querySelector('.form-erro');
                if (!erroEl) {
                    erroEl = document.createElement('div');
                    erroEl.className = 'form-erro';
                    campo.parentElement.appendChild(erroEl);
                }
                erroEl.textContent = 'Este campo é obrigatório';
                erroEl.style.display = 'block';
            } else {
                campo.classList.remove('erro');
                const erroEl = campo.parentElement.querySelector('.form-erro');
                if (erroEl) erroEl.style.display = 'none';
            }
        }
        
        // Validar radio buttons
        if (campo.type === 'radio') {
            const grupoName = campo.getAttribute('name');
            const radioSelecionado = stepAtual.querySelector(`[name="${grupoName}"]:checked`);
            if (!radioSelecionado) {
                valido = false;
                mostrarToast('Por favor, selecione uma opção', 'erro');
            }
        }
    });
    
    // Validação especial para upload de fotos (mínimo 3)
    if (currentStep === 4) { // Assumindo que step 4 é fotos
        const fotosUpload = document.querySelectorAll('.foto-preview');
        if (fotosUpload.length < 3) {
            valido = false;
            mostrarToast('Por favor, adicione pelo menos 3 fotos do barco', 'erro');
        }
    }
    
    if (!valido) {
        return false;
    }
    
    return true;
}

function submeterFormulario() {
    const form = document.querySelector('.form-multistep form');
    if (!form) return;
    
    // Obter usuário logado
    const usuarioStr = localStorage.getItem('usuarioLogado');
    if (!usuarioStr) {
        mostrarToast('Erro: usuário não autenticado', 'erro');
        window.location.href = 'auth.html';
        return;
    }
    
    const capitao = JSON.parse(usuarioStr);
    
    // Coletar dados do formulário
    const formData = new FormData(form);
    const extras = [];
    formData.getAll('extras').forEach(extra => extras.push(extra));
    
    // Criar objeto do barco
    const barco = {
        id: Date.now(),
        nome: formData.get('nome'),
        tipo: formData.get('tipo'),
        comprimento: parseFloat(formData.get('comprimento')),
        ano: parseInt(formData.get('ano')),
        marcaModelo: formData.get('marcaModelo') || '',
        porto: formData.get('porto'),
        lotacao: parseInt(formData.get('lotacao')),
        tipoMotor: formData.get('tipoMotor'),
        numeroMotores: parseInt(formData.get('numeroMotores')),
        potencia: parseInt(formData.get('potencia')),
        velocidadeMaxima: formData.get('velocidadeMaxima') ? parseInt(formData.get('velocidadeMaxima')) : null,
        autonomia: formData.get('autonomia') ? parseInt(formData.get('autonomia')) : null,
        extras: extras,
        fotos: fotosUpload.map(f => f.url),
        fotoPrincipal: fotosUpload.find(f => f.principal)?.url || fotosUpload[0]?.url,
        capitaoEmail: capitao.email,
        capitaoNome: capitao.nome,
        status: 'pendente',
        dataCriacao: new Date().toISOString(),
        avaliacaoMedia: 0,
        totalAvaliacoes: 0
    };
    
    mostrarLoading();
    
    // Salvar no localStorage
    setTimeout(() => {
        const barcos = JSON.parse(localStorage.getItem('barcos') || '[]');
        barcos.push(barco);
        localStorage.setItem('barcos', JSON.stringify(barcos));
        
        console.log('✅ Barco registado:', barco);
        
        esconderLoading();
        mostrarToast('Barco registado! Aguarda aprovação.', 'sucesso');
        setTimeout(() => {
            alert('✅ Barco registado com sucesso!\n\n⏳ O barco ficará com estado PENDENTE até que a administração valide os documentos:\n• Livrete do Barco\n• Certificado RNAAT\n• Certificado de Seguro\n\n📧 Receberá um email quando o barco for aprovado.\n\n⚠️ Só poderá criar saídas com barcos aprovados.');
            window.location.href = 'dashboard-capitao.html';
        }, 1500);
    }, 1500);
}

// ============================================
// UPLOAD DE FOTOS
// ============================================
let fotosUpload = [];

function initUploadFotos() {
    const uploadContainer = document.getElementById('uploadContainer');
    const inputFile = document.getElementById('inputFotos');
    
    if (!uploadContainer || !inputFile) return;
    
    // Click no container
    uploadContainer.addEventListener('click', () => {
        inputFile.click();
    });
    
    // Drag & Drop
    uploadContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadContainer.classList.add('dragover');
    });
    
    uploadContainer.addEventListener('dragleave', () => {
        uploadContainer.classList.remove('dragover');
    });
    
    uploadContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadContainer.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files);
        processarFotos(files);
    });
    
    // Change no input
    inputFile.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        processarFotos(files);
    });
}

function processarFotos(files) {
    files.forEach(file => {
        if (!file.type.startsWith('image/')) {
            mostrarToast('Por favor, selecione apenas imagens', 'erro');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const fotoData = {
                id: Date.now() + Math.random(),
                url: e.target.result,
                nome: file.name,
                principal: fotosUpload.length === 0
            };
            
            fotosUpload.push(fotoData);
            renderizarFotos();
        };
        reader.readAsDataURL(file);
    });
}

function renderizarFotos() {
    const preview = document.getElementById('fotosPreview');
    if (!preview) return;
    
    preview.innerHTML = '';
    
    fotosUpload.forEach((foto, index) => {
        const div = document.createElement('div');
        div.className = 'foto-preview';
        div.innerHTML = `
            <img src="${foto.url}" alt="${foto.nome}">
            <button type="button" class="foto-preview-remover" onclick="removerFoto(${foto.id})">
                <i class="fas fa-times"></i>
            </button>
            ${foto.principal ? '<div class="foto-preview-principal">📷 Foto Principal</div>' : ''}
        `;
        
        // Definir como principal ao clicar
        if (!foto.principal) {
            div.addEventListener('click', () => {
                definirFotoPrincipal(foto.id);
            });
        }
        
        preview.appendChild(div);
    });
}

function removerFoto(fotoId) {
    event.stopPropagation();
    fotosUpload = fotosUpload.filter(f => f.id !== fotoId);
    
    // Se removemos a principal, definir a primeira como principal
    if (fotosUpload.length > 0 && !fotosUpload.some(f => f.principal)) {
        fotosUpload[0].principal = true;
    }
    
    renderizarFotos();
    mostrarToast('Foto removida', 'sucesso');
}

function definirFotoPrincipal(fotoId) {
    fotosUpload.forEach(f => f.principal = false);
    const foto = fotosUpload.find(f => f.id === fotoId);
    if (foto) {
        foto.principal = true;
        renderizarFotos();
        mostrarToast('Foto principal definida', 'sucesso');
    }
}

// ============================================
// MÁSCARAS E FORMATAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Máscara de telefone
    const inputsTelefone = document.querySelectorAll('input[type="tel"]');
    inputsTelefone.forEach(input => {
        input.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 9) valor = valor.substring(0, 9);
            
            if (valor.length > 6) {
                valor = valor.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
            } else if (valor.length > 3) {
                valor = valor.replace(/(\d{3})(\d{0,3})/, '$1 $2');
            }
            
            e.target.value = valor;
        });
    });
});

// Exportar funções globais
window.removerFoto = removerFoto;
window.definirFotoPrincipal = definirFotoPrincipal;