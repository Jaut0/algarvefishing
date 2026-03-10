# 🔧 CORREÇÃO: Registo de Cliente Particular

## ❌ **Problema Identificado:**

Ao tentar registar um cliente particular (Privado), o formulário não avançava mesmo preenchendo todos os campos.

---

## 🔍 **Causa Raiz:**

Os campos de upload de documentos dos capitães (Livrete, RNAAT, Seguro) tinham o atributo `required="true"` no HTML.

Quando o utilizador escolhia "Privado", esses campos ficavam **ocultos** (com CSS `display: none`), mas o navegador **ainda exigia** que fossem preenchidos antes de submeter o formulário!

### **Código Problemático:**
```html
<!-- ANTES: -->
<input type="file" id="uploadLivrete" required>  ❌
<input type="file" id="uploadRNAAT" required>   ❌
<input type="file" id="uploadSeguro" required>  ❌
```

Resultado: Cliente privado não conseguia submeter porque o navegador bloqueava silenciosamente.

---

## ✅ **Solução Aplicada:**

### **1. Removi `required` do HTML**
```html
<!-- DEPOIS: -->
<input type="file" id="uploadLivrete">  ✅
<input type="file" id="uploadRNAAT">   ✅
<input type="file" id="uploadSeguro">  ✅
```

### **2. Adicionei lógica JavaScript dinâmica**
```javascript
// Campos que devem ser obrigatórios apenas para capitães
const camposCapitaoInputs = [
    document.getElementById('registarExperiencia'),
    document.getElementById('registarPorto'),
    document.getElementById('uploadLivrete'),
    document.getElementById('uploadRNAAT'),
    document.getElementById('uploadSeguro')
];

tipoRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'capitao') {
            camposCapitao.classList.add('visivel');
            // Tornar campos obrigatórios APENAS para capitão
            camposCapitaoInputs.forEach(input => {
                if (input) input.required = true;
            });
        } else {
            camposCapitao.classList.remove('visivel');
            // Remover obrigatoriedade para cliente privado
            camposCapitaoInputs.forEach(input => {
                if (input) input.required = false;
            });
        }
    });
});
```

---

## 🎯 **Como Funciona Agora:**

### **Cliente Privado:**
1. Seleciona "Privado" → Campos de capitão **ocultos**
2. JavaScript define `required = false` → Campos **não obrigatórios**
3. Preenche apenas: Nome, Email, Telefone, Password
4. Submete → ✅ **Funciona!**

### **Capitão:**
1. Seleciona "Capitão" → Campos de capitão **visíveis**
2. JavaScript define `required = true` → Campos **obrigatórios**
3. Preenche: Nome, Email, Telefone, Experiência, Porto, Documentos, Password
4. Submete → ✅ **Funciona!**

---

## 🧪 **Como Testar:**

### **Teste Rápido (1 minuto):**

#### **Opção 1: Página de Teste Dedicada** (recomendado)
```
1. Abrir: teste-registo-cliente.html
2. Campos já preenchidos automaticamente
3. Clicar "Registar Cliente"
4. Ver logs em tempo real
5. Se sucesso → testar em auth.html
```

#### **Opção 2: auth.html Direto**
```
1. Abrir: auth.html
2. Tab "Registar"
3. Selecionar "Privado" (🧑)
4. Preencher:
   • Nome: João Teste
   • Email: joao@teste.com
   • Telefone: +351 912 345 678
   • Password: teste123
   • Confirmar: teste123
5. ✅ Aceitar termos
6. Clicar "Criar Conta"
7. Ver toast verde ✅
8. Ver alert com link de confirmação
```

---

## 📊 **Ficheiros Modificados:**

| Ficheiro | Alteração | Linhas |
|----------|-----------|--------|
| `auth.html` | Removido `required` dos uploads | 3 linhas |
| `auth.html` | Adicionada lógica JS dinâmica | ~20 linhas |
| `teste-registo-cliente.html` | **NOVO** - Página de teste | 150 linhas |

---

## ✅ **Checklist de Validação:**

### **Cliente Privado:**
- [ ] Selecionar "Privado"
- [ ] Campos de capitão ficam ocultos
- [ ] Preencher apenas dados básicos
- [ ] Submeter formulário
- [ ] Ver toast de sucesso
- [ ] Ver alert com link de confirmação
- [ ] Link no console (F12)

### **Capitão:**
- [ ] Selecionar "Capitão"
- [ ] Campos de capitão aparecem
- [ ] Campos obrigatórios marcados
- [ ] Preencher todos os dados
- [ ] Tentar submeter sem docs → erro
- [ ] Adicionar docs → sucesso
- [ ] Ver toast e alert

---

## 🐛 **Depuração (se ainda não funcionar):**

### **1. Abrir Console (F12):**
```javascript
// Ver utilizadores guardados:
console.log(JSON.parse(localStorage.getItem('utilizadores')));

// Ver emails simulados:
console.log(JSON.parse(localStorage.getItem('emailsSimulados')));

// Limpar tudo:
localStorage.clear();
```

### **2. Verificar erros:**
- Console (F12) → Tab "Console"
- Ver mensagens de erro em vermelho
- Ver logs das validações

### **3. Usar página de teste:**
- `teste-registo-cliente.html` mostra TODOS os logs
- Fácil de identificar onde falha

---

## 🎯 **Fluxo Completo Corrigido:**

```
1. Cliente abre auth.html
   ↓
2. Clica tab "Registar"
   ↓
3. Seleciona "Privado" (padrão)
   ↓
4. JavaScript define campos capitão como NÃO obrigatórios
   ↓
5. Cliente preenche dados básicos
   ↓
6. Clica "Criar Conta"
   ↓
7. JavaScript valida campos
   ✅ Nome preenchido
   ✅ Email preenchido
   ✅ Telefone preenchido
   ✅ Passwords coincidem
   ✅ Password >= 6 chars
   ↓
8. Cria objeto utilizador
   ↓
9. Guarda no localStorage
   ↓
10. Gera token de confirmação
   ↓
11. Simula envio de email
   ↓
12. Mostra toast de sucesso ✅
   ↓
13. Mostra alert com link
   ↓
14. Redireciona para index.html
```

---

## 📝 **Próximos Passos Após Registo:**

1. **Copiar link de confirmação** do console ou alert
2. **Abrir link** em nova aba (confirmar-email.html?token=...)
3. **Clicar "Confirmar Email"**
4. **Fazer login** em auth.html
5. **Aceder** dashboard-usuario.html

---

## 🎉 **Status:**

✅ **Problema corrigido!**  
✅ **Clientes privados podem registar-se!**  
✅ **Capitães continuam a funcionar!**  
✅ **Validações dinâmicas implementadas!**

---

## 📞 **Teste Agora:**

**Opção Rápida:**
```
1. Abrir: teste-registo-cliente.html
2. Clicar "Registar Cliente"
3. Ver sucesso nos logs
```

**Opção Completa:**
```
1. Abrir: auth.html
2. Registar como "Privado"
3. Preencher dados
4. Submeter
5. Confirmar email
6. Login
```

---

**✅ Correção aplicada! Pode testar agora!** 🚀
