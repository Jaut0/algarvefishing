# 🔧 CORREÇÃO: Badges Sidebar + Download de Documentos

## ❌ PROBLEMAS IDENTIFICADOS

### 1. **Badges da Sidebar Não Atualizam**
- Os números "3" e "5" estavam **hardcoded** no HTML
- Não refletiam o número real de capitães/barcos pendentes

### 2. **Documentos Sem Link de Download**
- Documentos só mostravam nome do ficheiro
- Admin não conseguia verificar documentos antes de aprovar
- Faltava funcionalidade de download

---

## ✅ CORREÇÕES APLICADAS

### 📄 **Ficheiro: `admin-dashboard.html`**

#### **Correção 1: Atualização Dinâmica dos Badges**

##### **ANTES (Estático):**
```html
<!-- Sidebar - HARDCODED -->
<a href="#" class="sidebar-menu-item" data-section="pendentes">
    <i class="fas fa-clock"></i>
    <span>Capitães Pendentes</span>
    <span class="badge badge-destaque">3</span> ← FIXO!
</a>

<a href="#" class="sidebar-menu-item" data-section="barcos">
    <i class="fas fa-ship"></i>
    <span>Barcos Pendentes</span>
    <span class="badge badge-destaque">5</span> ← FIXO!
</a>
```

```javascript
// JavaScript - NÃO atualizava sidebar
function carregarEstatisticas() {
    // ... calcula números ...
    // ❌ Só atualizava os cards, não os badges!
}
```

##### **DEPOIS (Dinâmico):**
```javascript
function carregarEstatisticas() {
    const utilizadores = JSON.parse(localStorage.getItem('utilizadores') || '[]');
    const barcos = JSON.parse(localStorage.getItem('barcos') || '[]');
    
    const capitaesPendentes = utilizadores.filter(u => 
        u.tipo === 'capitao' && u.status === 'pendente'
    ).length;
    
    const barcosPendentes = barcos.filter(b => 
        b.status === 'pendente'
    ).length;
    
    // Atualizar cards (já existia)
    statCards[0].querySelector('.stat-valor').textContent = capitaesPendentes;
    
    // ✅ NOVO: Atualizar badges da sidebar
    const badgePendentes = document.querySelector('[data-section="pendentes"] .badge');
    if (badgePendentes) {
        badgePendentes.textContent = capitaesPendentes;
        badgePendentes.style.display = capitaesPendentes > 0 ? 'inline-block' : 'none';
    }
    
    const badgeBarcos = document.querySelector('[data-section="barcos"] .badge');
    if (badgeBarcos) {
        badgeBarcos.textContent = barcosPendentes;
        badgeBarcos.style.display = barcosPendentes > 0 ? 'inline-block' : 'none';
    }
}
```

**Resultado:**
- ✅ Badge mostra número real de capitães pendentes
- ✅ Badge mostra número real de barcos pendentes
- ✅ Badge esconde-se automaticamente quando número = 0
- ✅ Atualiza após aprovar/rejeitar

---

#### **Correção 2: Botões de Download nos Documentos**

##### **ANTES (Só Texto):**
```html
<div>
    <i class="fas fa-check-circle"></i> 
    Livrete: livrete.pdf
    <!-- ❌ Sem botão de download! -->
</div>
<div>
    <i class="fas fa-check-circle"></i> 
    RNAAT: rnaat.pdf
</div>
<div>
    <i class="fas fa-check-circle"></i> 
    Seguro: seguro.pdf
</div>
```

##### **DEPOIS (Com Botões):**
```html
<div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: white; border-radius: 4px;">
    <div>
        <i class="fas fa-file-pdf" style="color: #EF4444;"></i> 
        <strong>Livrete:</strong> livrete.pdf
    </div>
    <button class="btn btn-outline btn-pequeno" 
            onclick="downloadDocumento('USER_123', 'livrete', 'livrete.pdf')"
            title="Descarregar documento">
        <i class="fas fa-download"></i> Download
    </button>
</div>

<!-- Idem para RNAAT e Seguro -->

<!-- ✅ NOVO: Nota de aviso -->
<div style="margin-top: 1rem; border-top: 1px solid rgba(0,0,0,0.1);">
    <i class="fas fa-info-circle"></i> 
    <strong>Nota:</strong> Verifique todos os documentos antes de aprovar o capitão.
</div>
```

**Visual:**
```
┌──────────────────────────────────────────────────────┐
│ 📄 Documentos Submetidos:                            │
├──────────────────────────────────────────────────────┤
│ 📕 Livrete: livrete.pdf           [📥 Download]     │
│ 📕 RNAAT: rnaat.pdf               [📥 Download]     │
│ 📕 Seguro: seguro.pdf             [📥 Download]     │
├──────────────────────────────────────────────────────┤
│ ℹ️ Nota: Verifique todos os documentos antes...     │
└──────────────────────────────────────────────────────┘
```

---

#### **Correção 3: Função de Download (Simulada)**

```javascript
function downloadDocumento(capitaoId, tipoDoc, nomeArquivo) {
    // Toast de informação
    mostrarToast(`📥 A descarregar ${tipoDoc}: ${nomeArquivo}`, 'info');
    
    // Criar conteúdo simulado
    const conteudoSimulado = `
DOCUMENTO SIMULADO - ${tipoDoc.toUpperCase()}
============================================

Capitão ID: ${capitaoId}
Tipo de Documento: ${tipoDoc}
Nome do Ficheiro: ${nomeArquivo}
Data de Upload: ${new Date().toLocaleString('pt-PT')}

============================================
NOTA: Este é um download simulado.
Em produção, seria o documento real (PDF/imagem).
============================================
    `.trim();
    
    // Criar blob e forçar download
    const blob = new Blob([conteudoSimulado], { 
        type: 'text/plain;charset=utf-8' 
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tipoDoc}_${capitaoId}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Confirmação
    setTimeout(() => {
        mostrarToast(`✅ Documento descarregado: ${nomeArquivo}`, 'sucesso');
    }, 500);
}
```

**Como Funciona:**
1. Admin clica botão "📥 Download"
2. Toast aparece: "📥 A descarregar livrete: livrete.pdf"
3. Navegador faz download automático de ficheiro `.txt`
4. Ficheiro contém informações simuladas do documento
5. Toast de confirmação: "✅ Documento descarregado"

**Para Produção Real:**
Em produção, esta função faria:
1. Pedido HTTP ao servidor: `GET /api/documentos/{id}`
2. Servidor retorna ficheiro real (PDF, JPG, PNG)
3. Browser faz download do ficheiro real
4. Admin verifica documento real antes de aprovar

---

## 📊 COMPARAÇÃO ANTES vs DEPOIS

### **Sidebar**

#### ANTES:
```
┌─────────────────────────────┐
│ 🕐 Capitães Pendentes   [3] │ ← Fixo, não muda
│ 🚢 Barcos Pendentes     [5] │ ← Fixo, não muda
└─────────────────────────────┘
```

#### DEPOIS:
```
┌─────────────────────────────┐
│ 🕐 Capitães Pendentes   [1] │ ← Dinâmico! Atualiza!
│ 🚢 Barcos Pendentes     [0] │ ← Esconde-se se = 0
└─────────────────────────────┘
```

---

### **Documentos**

#### ANTES:
```
📄 Documentos Submetidos:
✅ Livrete: livrete.pdf
✅ RNAAT: rnaat.pdf
✅ Seguro: seguro.pdf

❌ Sem forma de descarregar!
```

#### DEPOIS:
```
📄 Documentos Submetidos:
┌────────────────────────────────────────┐
│ 📕 Livrete: livrete.pdf  [📥 Download] │
│ 📕 RNAAT: rnaat.pdf      [📥 Download] │
│ 📕 Seguro: seguro.pdf    [📥 Download] │
├────────────────────────────────────────┤
│ ℹ️ Nota: Verifique todos os docs...   │
└────────────────────────────────────────┘

✅ 3 botões de download funcionais!
```

---

## 🧪 COMO TESTAR

### **Teste 1: Badges da Sidebar**

1. **Estado inicial:**
   ```javascript
   localStorage.clear();
   // Sem capitães pendentes
   ```

2. **Aceder admin:**
   ```
   admin-login.html → Login
   ```

3. **Verificar sidebar:**
   ```
   Badges devem mostrar "0" ou estar escondidos
   ```

4. **Registar capitão:**
   ```
   auth.html?tipo=capitao → Registar
   ```

5. **Recarregar admin:**
   ```
   Dashboard → Badge deve mostrar "1" ✅
   ```

6. **Aprovar capitão:**
   ```
   Clicar "Aprovar" → Badge volta a "0" ✅
   ```

---

### **Teste 2: Download de Documentos**

1. **Registar capitão com docs**

2. **Aceder admin → Ver card pendente**

3. **Verificar documentos:**
   ```
   ✅ Ver 3 botões "📥 Download"
   ✅ Ver ícones PDF vermelhos
   ✅ Ver nomes dos ficheiros
   ✅ Ver nota de aviso
   ```

4. **Clicar "📥 Download" no Livrete:**
   ```
   → Toast: "📥 A descarregar livrete..."
   → Browser faz download: livrete_USER_xxx_xxx.txt
   → Toast: "✅ Documento descarregado"
   ```

5. **Abrir ficheiro descarregado:**
   ```
   Deve conter:
   - ID do capitão
   - Tipo de documento
   - Nome do ficheiro
   - Data de upload
   - Nota sobre simulação
   ```

6. **Repetir para RNAAT e Seguro**

---

## 📋 CHECKLIST DE VALIDAÇÃO

- [x] Badges da sidebar atualizam dinamicamente
- [x] Badge esconde-se quando número = 0
- [x] Badge mostra número correto após aprovação
- [x] Documentos têm ícone PDF vermelho
- [x] Cada documento tem botão "Download"
- [x] Botão de download funciona (ficheiro .txt)
- [x] Toast aparece ao clicar download
- [x] Nota de aviso está visível
- [x] Design está alinhado e legível
- [x] Responsivo (mobile/tablet)

---

## 🎨 MELHORIAS VISUAIS

### **Ícones:**
- ✅ PDF vermelho (#EF4444) para documentos
- ✅ Ícone download (fas fa-download)
- ✅ Ícone info (fas fa-info-circle)

### **Espaçamento:**
- ✅ Padding nos cards de documentos
- ✅ Gap entre documentos (0.75rem)
- ✅ Borda superior na nota de aviso

### **Cores:**
- ✅ Background branco nos cards de docs
- ✅ Background cinza claro no container
- ✅ Hover nos botões de download

---

## 🚀 PRÓXIMOS PASSOS (Produção)

Para implementar download real em produção:

### **Backend (API):**
```javascript
// Endpoint para upload
POST /api/capitao/documentos
Content-Type: multipart/form-data
Body: { livrete: File, rnaat: File, seguro: File }

// Endpoint para download
GET /api/admin/documento/{capitaoId}/{tipoDoc}
Response: File (PDF, JPG, PNG)
```

### **Frontend:**
```javascript
async function downloadDocumento(capitaoId, tipoDoc, nomeArquivo) {
    try {
        const response = await fetch(`/api/admin/documento/${capitaoId}/${tipoDoc}`);
        const blob = await response.blob();
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nomeArquivo;
        a.click();
        window.URL.revokeObjectURL(url);
        
        mostrarToast(`✅ ${nomeArquivo} descarregado!`, 'sucesso');
    } catch (error) {
        mostrarToast(`❌ Erro ao descarregar documento`, 'erro');
    }
}
```

### **Segurança:**
- ✅ Autenticação admin obrigatória
- ✅ Validação de tipo de ficheiro (PDF/JPG/PNG)
- ✅ Limite de tamanho (ex: 5MB)
- ✅ Scan de vírus antes de armazenar
- ✅ URL assinado com expiração
- ✅ Log de acessos aos documentos

---

## ✅ RESUMO

| Correção | Status | Descrição |
|----------|--------|-----------|
| **Badges Sidebar** | ✅ | Atualizam dinamicamente |
| **Download Livrete** | ✅ | Botão funcional (simulado) |
| **Download RNAAT** | ✅ | Botão funcional (simulado) |
| **Download Seguro** | ✅ | Botão funcional (simulado) |
| **Nota de Aviso** | ✅ | Adicionada |
| **Ícones PDF** | ✅ | Vermelhos, visíveis |
| **Design** | ✅ | Limpo e profissional |
| **Responsivo** | ✅ | Mobile/Tablet/Desktop |

---

**Status**: ✅ **CORRIGIDO E FUNCIONAL**  
**Data**: 08/03/2026  
**Versão**: 1.2
