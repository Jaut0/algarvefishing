# 🔐 CREDENCIAIS DE ADMINISTRADOR

**Última atualização**: 2026-03-09

---

## 🔑 ACESSO ADMIN

**URL**: https://algarvefishing.vercel.app/admin-login.html

**Credenciais**:
```
Email: geral@algarvetunacharter.pt
Password: Abc.1234!jauto
```

---

## ⚠️ IMPORTANTE - SEGURANÇA

### **Localização no Código**
As credenciais estão hardcoded em:
- **Ficheiro**: `admin-login.html`
- **Linha**: 153
- **Função**: Validação de login (linha 153)

### **Como as credenciais funcionam**
```javascript
if (email === 'geral@algarvetunacharter.pt' && password === 'Abc.1234!jauto') {
    // Login bem-sucedido → redireciona para admin-dashboard.html
}
```

---

## 🔒 RECOMENDAÇÕES DE SEGURANÇA

### **Para Ambiente de Desenvolvimento**
✅ Credenciais atuais são adequadas

### **Para Produção Real**
Você **DEVE** implementar:

1. **Backend com Hash de Passwords**
   ```javascript
   // Exemplo: Node.js + bcrypt
   const bcrypt = require('bcrypt');
   const hashedPassword = await bcrypt.hash('Abc.1234!jauto', 10);
   ```

2. **JWT Tokens**
   ```javascript
   // Criar token após login
   const token = jwt.sign({ userId: admin.id }, 'SECRET_KEY');
   ```

3. **Rate Limiting**
   - Bloquear após 5 tentativas falhadas
   - Timeout de 15 minutos

4. **HTTPS Obrigatório**
   - Vercel já fornece HTTPS automaticamente ✅

5. **2FA (Two-Factor Authentication)**
   - Email ou SMS com código de 6 dígitos

---

## 📝 HISTÓRICO DE ALTERAÇÕES

| Data | Email Antigo | Password Antiga | Email Novo | Password Nova |
|------|--------------|-----------------|------------|---------------|
| 2026-03-09 | servico@jauto.pt | 12345678 | geral@algarvetunacharter.pt | Abc.1234!jauto |

---

## 🧪 TESTAR LOGIN

### **Método 1: Browser**
1. Abra: https://algarvefishing.vercel.app/admin-login.html
2. Email: `geral@algarvetunacharter.pt`
3. Password: `Abc.1234!jauto`
4. Clique "Entrar como Admin"
5. Deve redirecionar para `admin-dashboard.html`

### **Método 2: Console**
```javascript
// No admin-login.html, abrir console (F12) e executar:
document.getElementById('adminEmail').value = 'geral@algarvetunacharter.pt';
document.getElementById('adminPassword').value = 'Abc.1234!jauto';
document.getElementById('formAdminLogin').dispatchEvent(new Event('submit'));
```

---

## ❌ ERROS COMUNS

### **Erro 1: "Email ou password incorretos!"**
**Causa**: Credenciais erradas ou typo
**Solução**: 
- Verificar maiúsculas/minúsculas
- Password: `Abc.1234!jauto` (com ponto, exclamação e @)
- Email: `geral@algarvetunacharter.pt` (sem maiúsculas)

### **Erro 2: "Página não redireciona"**
**Causa**: JavaScript bloqueado ou erro de console
**Solução**: 
- Abrir console (F12) e verificar erros
- Desativar bloqueadores de anúncios
- Tentar em janela anónima

### **Erro 3: "localStorage vazio após login"**
**Causa**: Sessão não foi criada
**Solução**: 
- Verificar se `mostrarLoading()` existe em `js/main.js`
- Limpar localStorage: `localStorage.clear()`
- Recarregar página

---

## 🔧 COMO ALTERAR CREDENCIAIS

Se precisar alterar novamente:

1. **Editar ficheiro**: `admin-login.html`
2. **Localizar linha 153**:
   ```javascript
   if (email === 'geral@algarvetunacharter.pt' && password === 'Abc.1234!jauto') {
   ```
3. **Substituir** pelos novos valores
4. **Fazer commit e push**:
   ```bash
   git add admin-login.html
   git commit -m "🔐 Alterar credenciais admin"
   git push
   ```
5. **Aguardar 2-3 minutos** para deploy no Vercel

---

## 📞 SUPORTE

Se tiver problemas com login:
- **Email**: geral@algarvetunacharter.pt
- **Verificar**: Console do browser (F12) para erros JavaScript
- **Reset**: Limpar localStorage e recarregar

---

**Status**: ✅ Credenciais atualizadas e seguras para desenvolvimento
