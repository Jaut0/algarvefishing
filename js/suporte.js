// Suporte e Reclamações JavaScript

let selectedTipo = null;
let selectedFiles = [];

// Tipo cards
const tipoCards = document.querySelectorAll('.tipo-card');
const form = document.getElementById('formReclamacao');
const tipoInput = document.getElementById('tipoReclamacao');

tipoCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selection from all cards
        tipoCards.forEach(c => c.classList.remove('selected'));
        
        // Select this card
        card.classList.add('selected');
        selectedTipo = card.dataset.tipo;
        tipoInput.value = selectedTipo;
        
        // Show form
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update assunto based on tipo
        updateAssunto(selectedTipo);
    });
});

// Update subject based on type
function updateAssunto(tipo) {
    const assuntoInput = document.getElementById('assunto');
    const tiposMap = {
        'cancelamento': 'Cancelamento de Saída pelo Capitão',
        'reembolso': 'Problema com Reembolso',
        'comportamento': 'Comportamento Inadequado do Capitão',
        'condicoes': 'Condições do Barco Não Correspondem ao Anunciado',
        'seguranca': 'Questão de Segurança',
        'outro': 'Outro Motivo'
    };
    
    assuntoInput.value = tiposMap[tipo] || '';
}

// File upload
const fileUploadArea = document.getElementById('fileUploadArea');
const fileInput = document.getElementById('fileInput');
const filesPreview = document.getElementById('filesPreview');

fileUploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    // Limit to 5 files
    if (selectedFiles.length + files.length > 5) {
        showToast('Máximo 5 ficheiros permitidos', 'warning');
        return;
    }
    
    files.forEach(file => {
        // Check file size (max 5MB per file)
        if (file.size > 5 * 1024 * 1024) {
            showToast(`Ficheiro ${file.name} muito grande (máx 5MB)`, 'warning');
            return;
        }
        
        selectedFiles.push(file);
    });
    
    renderFilesPreview();
    fileInput.value = ''; // Reset input
});

// Render files preview
function renderFilesPreview() {
    if (selectedFiles.length === 0) {
        filesPreview.innerHTML = '';
        return;
    }
    
    filesPreview.innerHTML = selectedFiles.map((file, index) => {
        const icon = getFileIcon(file.name);
        const size = formatFileSize(file.size);
        
        return `
            <div class="file-preview-item">
                <i class="${icon}"></i>
                <span>${file.name} (${size})</span>
                <button type="button" class="file-preview-remove" onclick="removeFile(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }).join('');
}

// Remove file
window.removeFile = function(index) {
    selectedFiles.splice(index, 1);
    renderFilesPreview();
};

// Get file icon
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const iconMap = {
        'pdf': 'fas fa-file-pdf',
        'doc': 'fas fa-file-word',
        'docx': 'fas fa-file-word',
        'jpg': 'fas fa-file-image',
        'jpeg': 'fas fa-file-image',
        'png': 'fas fa-file-image'
    };
    return iconMap[ext] || 'fas fa-file';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!selectedTipo) {
        showToast('Por favor, selecione o tipo de reclamação', 'error');
        return;
    }
    
    // Gather form data
    const formData = {
        id: Date.now(),
        tipo: selectedTipo,
        status: 'pendente',
        cliente: {
            nome: document.getElementById('nomeCliente').value,
            email: document.getElementById('emailCliente').value,
            telefone: document.getElementById('telefoneCliente').value,
            nif: document.getElementById('nifCliente').value
        },
        reserva: {
            barco: document.getElementById('nomeBarco').value,
            capitao: document.getElementById('nomeCapitao').value,
            data: document.getElementById('dataReserva').value,
            valor: document.getElementById('valorPago').value
        },
        reclamacao: {
            assunto: document.getElementById('assunto').value,
            descricao: document.getElementById('descricao').value
        },
        ficheiros: selectedFiles.map(f => ({
            nome: f.name,
            tamanho: f.size,
            tipo: f.type
        })),
        dataEnvio: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString()
    };
    
    // Save to localStorage (simulate backend)
    const reclamacoes = JSON.parse(localStorage.getItem('reclamacoes') || '[]');
    reclamacoes.push(formData);
    localStorage.setItem('reclamacoes', JSON.stringify(reclamacoes));
    
    // Show success modal
    showSuccessModal(formData);
});

// Show success modal
function showSuccessModal(data) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <button class="modal-close" onclick="this.closest('.modal').remove(); window.location.href='index.html';">
                <i class="fas fa-times"></i>
            </button>
            <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: rgba(76, 175, 80, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: #4CAF50;"></i>
                </div>
                <h2 style="color: var(--accent); margin-bottom: 1rem;">Reclamação Enviada!</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                    A sua reclamação foi recebida com sucesso. O nosso administrador irá analisar o caso e entrar em contacto consigo brevemente.
                </p>
                
                <div style="background: rgba(255, 255, 255, 0.03); padding: 2rem; border-radius: 12px; margin: 1.5rem 0; text-align: left;">
                    <h4 style="color: var(--accent); margin-bottom: 1rem;">📋 Número do Caso</h4>
                    <p style="font-size: 1.5rem; font-weight: 700; color: var(--accent); text-align: center; margin: 1rem 0;">
                        #${data.id}
                    </p>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); text-align: center;">
                        Guarde este número para referência futura
                    </p>
                    
                    <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                        <p style="margin: 0.5rem 0;"><strong>Assunto:</strong> ${data.reclamacao.assunto}</p>
                        <p style="margin: 0.5rem 0;"><strong>Barco:</strong> ${data.reserva.barco}</p>
                        <p style="margin: 0.5rem 0;"><strong>Data:</strong> ${formatDatePT(data.reserva.data)}</p>
                        ${data.ficheiros.length > 0 ? `<p style="margin: 0.5rem 0;"><strong>Anexos:</strong> ${data.ficheiros.length} ficheiro(s)</p>` : ''}
                    </div>
                </div>
                
                <div style="background: rgba(33, 150, 243, 0.1); padding: 1.2rem; border-radius: 8px; margin: 1.5rem 0; border-left: 4px solid #2196F3;">
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0; text-align: left;">
                        <i class="fas fa-info-circle" style="color: #2196F3;"></i> 
                        <strong>O que acontece agora?</strong><br><br>
                        1️⃣ O administrador irá analisar a sua reclamação<br>
                        2️⃣ Entraremos em contacto com o capitão mencionado<br>
                        3️⃣ Iremos contactá-lo por email ou telefone em até 48 horas<br>
                        4️⃣ Trabalharemos para resolver a situação da melhor forma
                    </p>
                </div>
                
                <div style="background: rgba(255, 193, 7, 0.1); padding: 1rem; border-radius: 8px; margin: 1.5rem 0; border-left: 4px solid #FFC107;">
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; text-align: left;">
                        <i class="fas fa-envelope" style="color: #FFC107;"></i> 
                        Enviámos um email de confirmação para <strong>${data.cliente.email}</strong>
                    </p>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <a href="suporte.html" class="btn btn-secondary" style="flex: 1; text-decoration: none; text-align: center;">
                        Nova Reclamação
                    </a>
                    <a href="index.html" class="btn btn-primary" style="flex: 1; text-decoration: none; text-align: center;">
                        Voltar ao Início
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    showToast('Reclamação enviada com sucesso!', 'success');
}

// Format date PT
function formatDatePT(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
}

// Reset form
window.resetForm = function() {
    form.reset();
    form.style.display = 'none';
    selectedTipo = null;
    selectedFiles = [];
    tipoCards.forEach(c => c.classList.remove('selected'));
    renderFilesPreview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if coming from a specific context (e.g., reservation)
    const urlParams = new URLSearchParams(window.location.search);
    const barco = urlParams.get('barco');
    const tipo = urlParams.get('tipo');
    
    if (tipo) {
        const card = document.querySelector(`.tipo-card[data-tipo="${tipo}"]`);
        if (card) card.click();
    }
    
    if (barco) {
        document.getElementById('nomeBarco').value = decodeURIComponent(barco);
    }
});
