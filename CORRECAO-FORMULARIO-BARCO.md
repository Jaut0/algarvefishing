# 🔧 CORREÇÃO: Formulário de Registro de Barco

## 🐛 Problemas Identificados

### 1. **Campos Invisíveis** 
- **PROBLEMA**: Texto branco em fundo branco - impossível ler ou escrever
- **CAUSA**: CSS do dashboard.css configurado para tema escuro, mas página usa fundo claro (`var(--cor-cinza-claro)`)

### 2. **Barco Não é Criado**
- **PROBLEMA**: Após preencher formulário e clicar "Registar Barco", nada acontece
- **CAUSA**: Função `submeterFormulario()` apenas simulava o envio, sem salvar no localStorage
- **CAUSA ADICIONAL**: Inputs sem atributo `name`, impossibilitando captura de dados via FormData

---

## ✅ CORREÇÕES APLICADAS

### 1. Estilos CSS Override (registar-barco.html)

Adicionado bloco `<style>` inline com override para página clara:

```css
.form-input,
.form-select,
.form-textarea {
    background-color: #ffffff;
    color: #1a202c;  /* Texto escuro visível */
    border: 2px solid #e2e8f0;
}

.form-input::placeholder {
    color: #a0aec0;  /* Placeholder cinza claro */
}

.form-input:focus {
    border-color: var(--cor-destaque);
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.1);
}

.form-label {
    color: var(--cor-primaria);  /* Labels azul escuro */
    font-weight: 600;
}

.checkbox-visual-label {
    background: #ffffff;
    border: 2px solid #e2e8f0;
    color: #1a202c;
}
```

**RESULTADO**: Todos os campos agora têm:
- ✅ Fundo branco
- ✅ Texto escuro (#1a202c)
- ✅ Borders claros visíveis
- ✅ Placeholder legível
- ✅ Labels em azul escuro
- ✅ Focus com border laranja

---

### 2. Atributos `name` Adicionados

**Etapa 1 - Informações Básicas:**
```html
<input name="nome" ...>
<select name="tipo" ...>
<input name="comprimento" ...>
<input name="ano" ...>
<input name="marcaModelo" ...>
<input name="porto" ...>
<input name="lotacao" ...>
```

**Etapa 2 - Motor:**
```html
<select name="tipoMotor" ...>
<input name="numeroMotores" ...>
<input name="potencia" ...>
<input name="velocidadeMaxima" ...>
<input name="autonomia" ...>
```

**Etapa 3 - Extras:**
```html
<input name="extras" value="ar_condicionado" ...>
<input name="extras" value="frigorifico" ...>
<!-- etc -->
```

---

### 3. Função `submeterFormulario()` Reescrita (js/forms.js)

**ANTES** (linha 190-205):
```javascript
function submeterFormulario() {
    // Apenas simulava o envio
    mostrarLoading();
    setTimeout(() => {
        esconderLoading();
        alert('Barco registado!');
        window.location.href = 'dashboard-capitao.html';
    }, 1500);
}
```

**DEPOIS** (linha 190-255):
```javascript
function submeterFormulario() {
    // 1. Verificar autenticação
    const usuarioStr = localStorage.getItem('usuarioLogado');
    if (!usuarioStr) {
        mostrarToast('Erro: usuário não autenticado', 'erro');
        window.location.href = 'auth.html';
        return;
    }
    
    const capitao = JSON.parse(usuarioStr);
    
    // 2. Coletar dados via FormData
    const formData = new FormData(form);
    const extras = formData.getAll('extras');
    
    // 3. Criar objeto do barco
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
        velocidadeMaxima: formData.get('velocidadeMaxima') ? parseInt(...) : null,
        autonomia: formData.get('autonomia') ? parseInt(...) : null,
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
    
    // 4. Salvar no localStorage
    const barcos = JSON.parse(localStorage.getItem('barcos') || '[]');
    barcos.push(barco);
    localStorage.setItem('barcos', JSON.stringify(barcos));
    
    console.log('✅ Barco registado:', barco);
    
    // 5. Redirecionar
    mostrarToast('Barco registado! Aguarda aprovação.', 'sucesso');
    setTimeout(() => {
        alert('✅ Barco registado com sucesso!...');
        window.location.href = 'dashboard-capitao.html';
    }, 1500);
}
```

**FUNCIONALIDADES IMPLEMENTADAS:**
1. ✅ Verificação de autenticação
2. ✅ Captura de todos os campos via FormData
3. ✅ Conversão de tipos (parseInt, parseFloat)
4. ✅ Tratamento de campos opcionais
5. ✅ Captura de múltiplos extras (checkboxes)
6. ✅ Vinculação com capitão logado
7. ✅ Upload de fotos (base64) e foto principal
8. ✅ Status "pendente" para aprovação admin
9. ✅ Salvamento persistente em localStorage
10. ✅ Log no console para debug
11. ✅ Toast + alerta + redirecionamento

---

## 📊 ESTRUTURA DO OBJETO BARCO

```javascript
{
    id: 1710098765432,  // timestamp único
    nome: "Mar Azul",
    tipo: "lancha",
    comprimento: 12,  // metros
    ano: 2020,
    marcaModelo: "Bayliner 285",
    porto: "Porto de Lisboa",
    lotacao: 8,  // pessoas
    tipoMotor: "interior-diesel",
    numeroMotores: 2,
    potencia: 250,  // CV
    velocidadeMaxima: 30,  // nós (opcional)
    autonomia: 200,  // milhas náuticas (opcional)
    extras: ["ar_condicionado", "gps", "radar"],
    fotos: [
        "data:image/jpeg;base64,...",
        "data:image/jpeg;base64,...",
        "data:image/jpeg;base64,..."
    ],
    fotoPrincipal: "data:image/jpeg;base64,...",
    capitaoEmail: "capitao@exemplo.pt",
    capitaoNome: "João Silva",
    status: "pendente",  // pendente | aprovado | rejeitado
    dataCriacao: "2026-03-10T20:45:00.000Z",
    avaliacaoMedia: 0,
    totalAvaliacoes: 0
}
```

---

## 🧪 COMO TESTAR

### Pré-requisitos:
1. ✅ Login como capitão
2. ✅ Email confirmado

### Passos:
1. Ir para: `https://algarvefishing.vercel.app/registar-barco.html`
2. **Etapa 1** - Preencher:
   - Nome: "Algarve Explorer"
   - Tipo: "Barco de Pesca"
   - Comprimento: 15 metros
   - Ano: 2022
   - Marca: "Jeanneau Merry Fisher"
   - Porto: "Marina de Portimão"
   - Lotação: 10 pessoas
   - Clicar "Próximo"

3. **Etapa 2** - Preencher:
   - Tipo Motor: "Interior - Diesel"
   - Número Motores: 2
   - Potência: 400 CV
   - Velocidade: 28 nós
   - Autonomia: 300 milhas
   - Clicar "Próximo"

4. **Etapa 3** - Selecionar extras:
   - Ar Condicionado ✓
   - GPS ✓
   - Radar ✓
   - Cozinha ✓
   - Casa de Banho ✓
   - Clicar "Próximo"

5. **Etapa 4** - Upload fotos:
   - Adicionar pelo menos 3 fotos
   - Definir foto principal (clicando nela)
   - Clicar "Registar Barco"

6. **Verificação:**
   - ✅ Toast verde: "Barco registado! Aguarda aprovação."
   - ✅ Alert com informações sobre aprovação
   - ✅ Redirecionamento para dashboard-capitao.html
   - ✅ No console: `✅ Barco registado: {...}`
   - ✅ No localStorage: `barcos` contém novo barco

7. **Dashboard Capitão:**
   - Verificar estatística "Barcos Registados" incrementou
   - (Futuramente) Ver barco na seção "Meus Barcos"

---

## 📁 FICHEIROS ALTERADOS

1. **registar-barco.html** 
   - Adicionado bloco `<style>` com CSS override (45 linhas)
   - Adicionado atributo `name` em 12 campos

2. **js/forms.js**
   - Reescrita função `submeterFormulario()` (65 linhas)
   - Implementado salvamento em localStorage
   - Adicionada validação de autenticação
   - Implementada captura de dados via FormData

---

## 🎨 ANTES vs DEPOIS

### ANTES:
```
┌─────────────────────────────┐
│  [Cinza Claro]              │
│                             │
│  [        ]  ← Invisível!   │
│  [        ]  ← Texto branco │
│  [        ]  ← em fundo     │
│              ← claro        │
└─────────────────────────────┘

❌ Clicar "Registar" → Nada acontece
```

### DEPOIS:
```
┌─────────────────────────────┐
│  [Branco]                   │
│                             │
│  [Mar Azul] ← Texto escuro  │
│  [Lancha  ▼] ← Visível      │
│  [12] [2022] ← Legível      │
│                             │
└─────────────────────────────┘

✅ Clicar "Registar" → Barco salvo em localStorage
✅ Dashboard atualiza contador
✅ Console mostra log
```

---

## 🚀 PRÓXIMOS PASSOS

- [ ] **Deploy das alterações**
- [ ] **Testar registro completo** (4 etapas + fotos)
- [ ] **Verificar dashboard** (contador incrementa)
- [ ] **Admin** - criar página para aprovar barcos pendentes
- [ ] **Dashboard Capitão** - seção "Meus Barcos" com lista

---

## ⚠️ NOTAS IMPORTANTES

1. **Fotos em Base64**: As fotos são armazenadas em formato Base64 no localStorage. Para produção, considerar upload para servidor/cloud storage.

2. **Limite localStorage**: Navegadores limitam localStorage a ~5-10MB. Base64 aumenta tamanho em ~33%. Com 3 fotos de 1MB cada → ~4MB em Base64.

3. **Validação de Fotos**: Função `validarStepAtual()` verifica mínimo de 3 fotos na Etapa 4.

4. **Status Pendente**: Barcos começam com `status: "pendente"`. Admin precisa aprovar antes de poderem ser usados para criar saídas.

5. **Estatísticas**: A função `carregarEstatisticas()` no dashboard do capitão agora conta os barcos reais deste capitão.

---

**Data**: 2026-03-10  
**Status**: ✅ CORRIGIDO - Pronto para deploy e testes
