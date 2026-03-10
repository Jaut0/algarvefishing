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
    
    // Botão Submit - usa type="button" com onclick seguro
    // (evita submit nativo da form que causa reload)
    if (btnSubmit) {
        // Forçar type="button" para evitar reload acidental
        btnSubmit.type = 'button';
        btnSubmit.addEventListener('click', () => {
            if (validarStepAtual()) {
                submeterFormulario();
            }
        });
    }
    
    // Prevenir submit nativo da form (segurança extra)
    const form = document.querySelector('.form-multistep form') || document.getElementById('formRegistarBarco');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
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
    const formStepConteudos = document.querySelectorAll('.form-step-conteudo');
    const stepAtual = formStepConteudos[currentStep - 1];
    if (!stepAtual) return true;
    
    const camposObrigatorios = stepAtual.querySelectorAll('[required]');
    let valido = true;
    
    camposObrigatorios.forEach(campo => {
        // Validar checkboxes com mínimo
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
            if (!campo.value || !campo.value.trim()) {
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
                // Focar no primeiro campo com erro
                if (valido === false) {
                    try { campo.focus(); } catch(e) {}
                }
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
    
    // Validação step 4 - fotos (mínimo 1, aviso se menos de 3)
    if (currentStep === totalSteps) {
        const fotosCount = document.querySelectorAll('.foto-preview').length;
        if (fotosCount === 0) {
            valido = false;
            mostrarToast('Adicione pelo menos 1 foto do barco para continuar', 'erro');
        } else if (fotosCount < 3) {
            // Apenas aviso, não bloquear
            mostrarToast(`Tem ${fotosCount} foto(s). Recomendamos pelo menos 3 para melhor apresentação.`, 'aviso');
            // Não bloquear - deixa submeter com aviso
        }
    }
    
    return valido;
}

function submeterFormulario() {
    const form = document.querySelector('.form-multistep form') || document.getElementById('formRegistarBarco');
    if (!form) {
        console.error('Formulário não encontrado!');
        return;
    }
    
    // Obter utilizador logado
    const usuarioStr = localStorage.getItem('usuarioLogado');
    if (!usuarioStr) {
        mostrarToast('Erro: precisa fazer login primeiro', 'erro');
        setTimeout(() => window.location.href = 'auth.html', 1500);
        return;
    }
    
    const capitao = JSON.parse(usuarioStr);
    
    if (capitao.tipo !== 'capitao') {
        mostrarToast('Apenas capitães podem registar barcos', 'erro');
        return;
    }
    
    // Coletar dados do formulário
    const formData = new FormData(form);
    const extras = formData.getAll('extras');
    
    // Obter porto - pode ser select ou input
    const portoEl = form.querySelector('[name="porto"]');
    const portoValor = portoEl ? portoEl.value : '';
    
    // Criar objeto do barco
    const barco = {
        id: Date.now(),
        nome: formData.get('nome') || '',
        tipo: formData.get('tipo') || '',
        comprimento: parseFloat(formData.get('comprimento')) || 0,
        ano: parseInt(formData.get('ano')) || new Date().getFullYear(),
        marcaModelo: formData.get('marcaModelo') || '',
        porto: portoValor,
        lotacao: parseInt(formData.get('lotacao')) || 8,
        tipoMotor: formData.get('tipoMotor') || '',
        numeroMotores: parseInt(formData.get('numeroMotores')) || 1,
        potencia: parseInt(formData.get('potencia')) || 0,
        velocidadeMaxima: formData.get('velocidadeMaxima') ? parseInt(formData.get('velocidadeMaxima')) : null,
        autonomia: formData.get('autonomia') ? parseInt(formData.get('autonomia')) : null,
        extras: extras,
        fotos: fotosUpload.map(f => f.url),
        fotoPrincipal: fotosUpload.find(f => f.principal)?.url || (fotosUpload[0]?.url || ''),
        capitaoEmail: capitao.email,
        capitaoNome: capitao.nome,
        status: 'pendente',
        dataCriacao: new Date().toISOString(),
        avaliacaoMedia: 0,
        totalAvaliacoes: 0
    };
    
    // Validação básica
    if (!barco.nome) { mostrarToast('Preencha o nome do barco', 'erro'); return; }
    if (!barco.tipo) { mostrarToast('Selecione o tipo de barco', 'erro'); return; }
    if (!barco.porto) { mostrarToast('Selecione o porto de amarração', 'erro'); return; }
    
    console.log('🚢 A registar barco:', barco);
    
    // Mostrar loading
    const btnSubmit = document.getElementById('btnSubmit');
    if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A registar...';
    }
    
    // Salvar no localStorage
    try {
        const barcos = JSON.parse(localStorage.getItem('barcos') || '[]');
        barcos.push(barco);
        localStorage.setItem('barcos', JSON.stringify(barcos));
        
        console.log('✅ Barco guardado:', barco.nome, '| Total barcos:', barcos.length);
        
        mostrarToast('✅ Barco registado com sucesso! Aguarda aprovação.', 'sucesso');
        
        setTimeout(() => {
            alert(
                '✅ Barco "' + barco.nome + '" registado!\n\n' +
                '⏳ Estado: PENDENTE - aguarda validação da administração\n\n' +
                '📋 Documentos necessários para aprovação:\n' +
                '  • Livrete do Barco\n' +
                '  • Certificado RNAAT\n' +
                '  • Certificado de Seguro\n\n' +
                '📧 Será notificado quando o barco for aprovado.\n' +
                '⚠️ Só pode criar saídas com barcos aprovados.'
            );
            window.location.href = 'dashboard-capitao.html#barcos';
        }, 1000);
        
    } catch (err) {
        console.error('Erro ao guardar barco:', err);
        mostrarToast('Erro ao guardar barco. Tente novamente.', 'erro');
        if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '<i class="fas fa-check"></i> Registar Barco';
        }
    }
}

// ============================================
// UPLOAD DE FOTOS
// ============================================
let fotosUpload = [];

function initUploadFotos() {
    const uploadContainer = document.getElementById('uploadContainer');
    const inputFile = document.getElementById('inputFotos');
    
    if (!uploadContainer || !inputFile) return;
    
    uploadContainer.addEventListener('click', (e) => {
        if (!e.target.closest('.foto-preview-remover')) {
            inputFile.click();
        }
    });
    
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
    
    inputFile.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        processarFotos(files);
        // Reset input para permitir adicionar o mesmo ficheiro outra vez
        e.target.value = '';
    });
}

function processarFotos(files) {
    const maxFotos = 10;
    let adicionadas = 0;
    
    files.forEach(file => {
        if (fotosUpload.length >= maxFotos) {
            mostrarToast(`Máximo de ${maxFotos} fotos atingido`, 'aviso');
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            mostrarToast('Apenas imagens são aceites (JPG, PNG, etc.)', 'erro');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            mostrarToast(`"${file.name}" é demasiado grande (máx. 5MB)`, 'erro');
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
            adicionadas++;
            renderizarFotos();
            atualizarContadorFotos();
        };
        reader.readAsDataURL(file);
    });
}

function atualizarContadorFotos() {
    const contador = document.getElementById('contadorFotos');
    if (contador) {
        const n = fotosUpload.length;
        contador.textContent = `${n} foto${n !== 1 ? 's' : ''} adicionada${n !== 1 ? 's' : ''}`;
        contador.style.color = n >= 3 ? '#22C55E' : n > 0 ? '#FF8F00' : '#EF4444';
    }
}

function renderizarFotos() {
    const preview = document.getElementById('fotosPreview');
    if (!preview) return;
    
    if (fotosUpload.length === 0) {
        preview.innerHTML = '';
        return;
    }
    
    preview.innerHTML = fotosUpload.map((foto, index) => `
        <div class="foto-preview" style="position:relative; border-radius:8px; overflow:hidden; ${foto.principal ? 'border: 2px solid #22C55E;' : ''}">
            <img src="${foto.url}" alt="${foto.nome}" style="width:100%; height:120px; object-fit:cover;">
            <button type="button" class="foto-preview-remover" onclick="removerFoto(${foto.id})"
                style="position:absolute; top:4px; right:4px; background:rgba(239,68,68,0.9); color:white; border:none; border-radius:50%; width:24px; height:24px; cursor:pointer; font-size:12px; display:flex; align-items:center; justify-content:center;">
                <i class="fas fa-times"></i>
            </button>
            ${foto.principal
                ? '<div style="position:absolute; bottom:0; left:0; right:0; background:rgba(34,197,94,0.9); color:white; font-size:0.7rem; text-align:center; padding:2px;">📷 Principal</div>'
                : `<div onclick="definirFotoPrincipal(${foto.id})" style="position:absolute; bottom:0; left:0; right:0; background:rgba(0,0,0,0.5); color:white; font-size:0.7rem; text-align:center; padding:2px; cursor:pointer;">Clique para principal</div>`
            }
        </div>
    `).join('');
    
    atualizarContadorFotos();
}

function removerFoto(fotoId) {
    event.stopPropagation();
    fotosUpload = fotosUpload.filter(f => f.id !== fotoId);
    if (fotosUpload.length > 0 && !fotosUpload.some(f => f.principal)) {
        fotosUpload[0].principal = true;
    }
    renderizarFotos();
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
