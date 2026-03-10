# 🚀 ALGARVE CHARTER - SISTEMA DE EMAILS INTEGRADO

## ✅ O QUE FOI IMPLEMENTADO

### **📧 Sistema de Emails Profissionais**
- ✅ Integração **EmailJS + Hostinger SMTP**
- ✅ 5 contas de email configuradas
- ✅ 4 templates de email criados
- ✅ Envio automático em 3 fluxos principais

---

## 📂 FICHEIROS CRIADOS/MODIFICADOS

### **Novos Ficheiros**
1. `js/email-config.js` - Configuração centralizada EmailJS
2. `GUIA-EMAILJS-HOSTINGER.md` - Guia completo de setup
3. `README-EMAILS.md` - Este ficheiro

### **Ficheiros Modificados**
1. `auth.html` - Adicionado EmailJS SDK + envio de emails
2. `reservar-barco.html` - Adicionado EmailJS SDK
3. `suporte.html` - Adicionado EmailJS SDK
4. `js/reservar-barco.js` - Implementado envio de email em reservas

---

## 📧 FLUXOS DE EMAIL IMPLEMENTADOS

### **1️⃣ Registo de Capitão**
**Trigger**: Capitão regista-se no site  
**Para**: `admin@algarvecharter.com`  
**De**: `noreply@algarvecharter.com`  
**Template**: `registoCapitao`

**Conteúdo**:
- Nome, email, telefone do capitão
- Anos de experiência
- Porto de origem
- Link para painel admin

---

### **2️⃣ Registo de Cliente**
**Trigger**: Cliente regista-se no site  
**Para**: Email do cliente  
**De**: `noreply@algarvecharter.com`  
**Template**: `registoCliente`

**Conteúdo**:
- Mensagem de boas-vindas
- Links úteis (Explorar, Dashboard)
- Contacto de suporte

---

### **3️⃣ Nova Reserva de Barco**
**Trigger**: Cliente faz reserva  
**Para**: 
- Email do capitão (principal)
- `reservas@algarvecharter.com` (cópia)

**De**: `noreply@algarvecharter.com`  
**Reply-To**: Email do cliente  
**Template**: `reservaBarco`

**Conteúdo**:
- Dados do cliente (nome, email, telefone)
- Barco reservado
- Datas solicitadas
- Número de pescadores
- Mensagem adicional

---

### **4️⃣ Pedido de Suporte** (preparado)
**Trigger**: Cliente envia formulário de suporte  
**Para**: `suporte@algarvecharter.com`  
**De**: `noreply@algarvecharter.com`  
**Reply-To**: Email do cliente  
**Template**: `suporte`

---

## ⚙️ COMO CONFIGURAR (PASSOS ESSENCIAIS)

### **PASSO 1: Comprar Hostinger Email**
```
URL: https://www.hostinger.pt/email-profissional
Plano: Email Business (€2.99/mês)
Criar 5 contas:
- noreply@algarvecharter.com
- admin@algarvecharter.com
- reservas@algarvecharter.com
- suporte@algarvecharter.com
- capitao@algarvecharter.com (opcional)
```

### **PASSO 2: Configurar EmailJS**
```
1. Criar conta: https://www.emailjs.com/
2. Adicionar Email Service (Custom SMTP):
   - SMTP: smtp.hostinger.com
   - Port: 587
   - User: noreply@algarvecharter.com
   - Pass: [senha da conta]

3. Criar 4 Templates (ver GUIA-EMAILJS-HOSTINGER.md)
4. Copiar IDs
```

### **PASSO 3: Atualizar Código**
Editar `js/email-config.js`:
```javascript
const EMAIL_CONFIG = {
    serviceID: 'service_xxxxxxx',  // ← SEU SERVICE ID
    
    templates: {
        registoCapitao: 'template_xxx',   // ← SEU TEMPLATE ID
        registoCliente: 'template_yyy',
        reservaBarco: 'template_zzz',
        suporte: 'template_www'
    },
    
    publicKey: 'YOUR_PUBLIC_KEY',  // ← SUA PUBLIC KEY
    
    emails: {
        noreply: 'noreply@algarvecharter.com',
        admin: 'admin@algarvecharter.com',
        reservas: 'reservas@algarvecharter.com',
        suporte: 'suporte@algarvecharter.com'
    }
};
```

### **PASSO 4: Deploy**
```bash
cd C:\Users\servi\Desktop\algarvefishing
git add .
git commit -m "✅ Sistema de emails EmailJS + Hostinger completo"
git push
```

---

## 🧪 COMO TESTAR

### **Teste 1: Registo de Capitão**
1. Aceder: https://algarvefishing.vercel.app/auth.html
2. Clicar: **Registar**
3. Escolher: **Tenho um barco**
4. Preencher formulário
5. **Verificar**: Email em `admin@algarvecharter.com`

### **Teste 2: Registo de Cliente**
1. Aceder: https://algarvefishing.vercel.app/auth.html
2. Clicar: **Registar**
3. Escolher: **Sou Cliente**
4. Preencher com **teu email real**
5. **Verificar**: Email de boas-vindas na tua caixa

### **Teste 3: Reserva de Barco**
1. Aceder: https://algarvefishing.vercel.app/escolher-barco.html
2. Escolher um barco
3. Selecionar datas
4. Preencher com **email real**
5. **Verificar**: 
   - Email na caixa do capitão (mock)
   - Email em `reservas@algarvecharter.com`

---

## 💰 CUSTOS

| Serviço | Custo Mensal | Limite |
|---------|--------------|--------|
| **Hostinger Email Business** | €2.99 | 50 contas, ilimitado |
| **EmailJS FREE** | €0 | 200 emails/mês |
| **TOTAL** | **€2.99/mês** | **Suficiente para início** |

**Se ultrapassar 200 emails/mês**:
- EmailJS Pro: $15/mês (1000 emails)

---

## 🔧 TROUBLESHOOTING

### **Emails não chegam**
✅ Verificar console do browser (F12) para erros  
✅ Confirmar que `email-config.js` tem IDs corretos  
✅ Verificar pasta spam/junk  
✅ Testar SMTP no dashboard EmailJS  

### **Erro "EmailJS not initialized"**
✅ Verificar se script está carregado: `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>`  
✅ Verificar se `email-config.js` está incluído  
✅ Ver console para erros de carregamento  

### **Erro "Service ID invalid"**
✅ Copiar Service ID correto do dashboard  
✅ Verificar se está entre aspas: `'service_xxx'`  

---

## 📞 SUPORTE

- **EmailJS Docs**: https://www.emailjs.com/docs/
- **Hostinger**: https://www.hostinger.pt/tutoriais/
- **Guia Completo**: Ver `GUIA-EMAILJS-HOSTINGER.md`

---

## ✅ CHECKLIST DE DEPLOY

- [ ] Hostinger Email comprado
- [ ] 5 contas de email criadas
- [ ] EmailJS configurado (Service + Templates)
- [ ] IDs copiados para `email-config.js`
- [ ] Deploy no Vercel realizado
- [ ] Testes de email realizados
- [ ] Caixas de email verificadas

---

## 🎯 PRÓXIMOS PASSOS SUGERIDOS

1. **Configurar Autoresponders** no Hostinger
2. **Criar assinatura de email** profissional
3. **Monitorizar quota** EmailJS (200/mês)
4. **Configurar forwards** para emails importantes

---

**✅ Sistema de Emails Pronto para Produção!**
