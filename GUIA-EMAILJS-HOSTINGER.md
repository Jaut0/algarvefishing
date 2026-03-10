# 📧 GUIA DE CONFIGURAÇÃO - HOSTINGER + EmailJS

## 🎯 OBJETIVO
Integrar emails profissionais da **Hostinger** com **EmailJS** para envio automático de emails no site estático.

---

## 📋 PASSO 1: COMPRAR HOSTINGER EMAIL

### **1.1 Aceder ao Site**
- URL: https://www.hostinger.pt/email-profissional
- Escolher: **Email Business** (€2.99/mês)
- Domínio: `algarvecharter.com` ou `algarvecharter.pt`

### **1.2 Criar Contas de Email**
Após compra, criar estas contas no painel Hostinger:

```
📧 noreply@algarvecharter.com
   Senha: [escolher senha forte]
   Uso: Envio automático de emails (não responder)

📧 admin@algarvecharter.com
   Senha: [escolher senha forte]
   Uso: Receber notificações de novos capitães

📧 reservas@algarvecharter.com
   Senha: [escolher senha forte]
   Uso: Receber cópias de todas as reservas

📧 suporte@algarvecharter.com
   Senha: [escolher senha forte]
   Uso: Receber pedidos de suporte/contacto

📧 capitao@algarvecharter.com (opcional)
   Senha: [escolher senha forte]
   Uso: Email geral para capitães
```

### **1.3 Obter Dados SMTP**
No painel Hostinger, anotar:
- **SMTP Server**: `smtp.hostinger.com`
- **Port**: `587` (TLS recomendado) ou `465` (SSL)
- **Username**: `noreply@algarvecharter.com`
- **Password**: [senha escolhida]

---

## 📋 PASSO 2: CONFIGURAR EmailJS

### **2.1 Criar Conta EmailJS**
1. Aceder: https://www.emailjs.com/
2. Clicar: **Sign Up** (gratuito até 200 emails/mês)
3. Confirmar email

### **2.2 Adicionar Email Service (SMTP)**
1. Dashboard → **Email Services**
2. **Add New Service**
3. Escolher: **Custom SMTP Server**
4. Preencher:
   ```
   Service Name: Hostinger Algarve Charter
   SMTP Server: smtp.hostinger.com
   Port: 587
   Username: noreply@algarvecharter.com
   Password: [senha da conta noreply]
   Secure: TLS
   ```
5. **Test Connection** → deve aparecer ✅ Success
6. **Create Service**
7. **ANOTAR o Service ID** (ex: `service_abc1234`)

### **2.3 Criar Email Templates**

#### **Template 1: Registo de Capitão**
```
Template Name: Novo Capitão - Notificação Admin
Subject: [NOVO CAPITÃO] {{capitao_nome}}

Corpo do email:
---
Olá Administração,

Um novo capitão registou-se na plataforma:

👤 Nome: {{capitao_nome}}
📧 Email: {{capitao_email}}
📞 Telefone: {{capitao_telefone}}
⚓ Porto: {{capitao_porto}}
📅 Experiência: {{capitao_experiencia}} anos
🕐 Data de Registo: {{data_registo}}

Por favor, valide os documentos e aprove o capitão no painel admin:
{{link_admin}}

---
Algarve Charter - Sistema Automático
```

**ANOTAR Template ID**: `template_xxx`

#### **Template 2: Boas-vindas Cliente**
```
Template Name: Boas-vindas Cliente
Subject: Bem-vindo à Algarve Charter! 🎣

Corpo do email:
---
Olá {{cliente_nome}}! 👋

Bem-vindo à **Algarve Charter** - a tua porta de entrada para as melhores aventuras de pesca no Algarve!

🌊 O que podes fazer agora:
✅ Explorar saídas de pesca disponíveis
✅ Reservar barcos com capitães experientes
✅ Ver o teu histórico de reservas

🔗 Links Úteis:
📋 Explorar Saídas: {{link_explorar}}
👤 Meu Dashboard: {{link_dashboard}}

Se tiveres dúvidas, responde a este email ou contacta suporte@algarvecharter.com

Boas pescas! 🎣
Equipa Algarve Charter
---
```

**ANOTAR Template ID**: `template_yyy`

#### **Template 3: Nova Reserva**
```
Template Name: Nova Reserva - Notificação Capitão
Subject: [NOVA RESERVA] {{cliente_nome}} - {{data_reserva}}

Corpo do email:
---
Olá {{capitao_nome}}! 🚢

Recebeste uma nova reserva no teu barco:

🚤 BARCO: {{barco_nome}}
👤 CLIENTE: {{cliente_nome}}
📧 Email: {{cliente_email}}
📞 Telefone: {{cliente_telefone}}
📅 Data Solicitada: {{data_reserva}}
👥 Nº Pescadores: {{num_pescadores}}

💬 MENSAGEM DO CLIENTE:
{{mensagem}}

⏰ Pedido recebido em: {{data_pedido}}

---
🔔 AÇÃO NECESSÁRIA:
Por favor, contacta o cliente diretamente para confirmar:
📞 Telefone: {{cliente_telefone}}
📧 Email: {{cliente_email}}

---
Algarve Charter - Sistema de Reservas
```

**ANOTAR Template ID**: `template_zzz`

#### **Template 4: Pedido de Suporte**
```
Template Name: Pedido de Suporte
Subject: [SUPORTE] {{assunto}}

Corpo do email:
---
Novo pedido de suporte recebido:

👤 Nome: {{user_nome}}
📧 Email: {{user_email}}
📞 Telefone: {{user_telefone}}
📋 Assunto: {{assunto}}
🕐 Data: {{data_envio}}

💬 MENSAGEM:
{{mensagem}}

---
Responder para: {{user_email}}
```

**ANOTAR Template ID**: `template_www`

### **2.4 Obter Public Key**
1. Dashboard → **Account** → **General**
2. Copiar **Public Key** (ex: `AbC123XyZ`)

---

## 📋 PASSO 3: CONFIGURAR NO CÓDIGO

### **3.1 Atualizar js/email-config.js**

Abrir o ficheiro `js/email-config.js` e substituir:

```javascript
const EMAIL_CONFIG = {
    serviceID: 'service_abc1234',  // ← COLOCAR Service ID do EmailJS
    
    templates: {
        registoCapitao: 'template_xxx',   // ← Template 1
        registoCliente: 'template_yyy',   // ← Template 2
        reservaBarco: 'template_zzz',     // ← Template 3
        suporte: 'template_www'           // ← Template 4
    },
    
    publicKey: 'AbC123XyZ',  // ← Public Key do EmailJS
    
    emails: {
        noreply: 'noreply@algarvecharter.com',
        admin: 'admin@algarvecharter.com',
        reservas: 'reservas@algarvecharter.com',
        suporte: 'suporte@algarvecharter.com',
        capitao: 'capitao@algarvecharter.com'
    }
};
```

### **3.2 Adicionar Script EmailJS ao HTML**

Em **TODOS** os ficheiros HTML que usam email, adicionar antes de `</head>`:

```html
<!-- EmailJS SDK -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script src="js/email-config.js"></script>
```

**Ficheiros a alterar**:
- `auth.html`
- `reservar-barco.html`
- `suporte.html`

---

## 📋 PASSO 4: TESTAR

### **4.1 Teste de Registo de Capitão**
1. Abrir: `auth.html`
2. Registar como capitão
3. Verificar email em: `admin@algarvecharter.com`

### **4.2 Teste de Registo de Cliente**
1. Abrir: `auth.html`
2. Registar como cliente
3. Verificar email na conta do cliente

### **4.3 Teste de Reserva**
1. Abrir: `reservar-barco.html`
2. Fazer uma reserva
3. Verificar email do capitão + `reservas@algarvecharter.com`

---

## ✅ CHECKLIST FINAL

- [ ] Hostinger Email comprado (€2.99/mês)
- [ ] 5 contas de email criadas
- [ ] EmailJS configurado (Service + 4 Templates)
- [ ] IDs copiados para `email-config.js`
- [ ] Script EmailJS adicionado aos HTML
- [ ] Testes realizados com sucesso

---

## 🆘 TROUBLESHOOTING

### **Emails não chegam**
✅ Verificar spam/junk  
✅ Confirmar credenciais SMTP  
✅ Ver console do browser (F12) para erros  
✅ Verificar quota EmailJS (200/mês no FREE)  

### **Erro "Service ID invalid"**
✅ Copiar Service ID correto do dashboard EmailJS  
✅ Atualizar `email-config.js`  

### **Erro "Public Key invalid"**
✅ Copiar Public Key do dashboard  
✅ Verificar se está entre aspas no código  

---

## 💰 CUSTOS TOTAIS

| Serviço | Custo | Limite |
|---------|-------|--------|
| **Hostinger Email Business** | €2.99/mês | 50 contas, ilimitado |
| **EmailJS FREE** | €0 | 200 emails/mês |
| **TOTAL** | **€2.99/mês** | **Emails ilimitados** |

Se ultrapassar 200 emails/mês no EmailJS:
- **EmailJS Pro**: $15/mês (1000 emails)
- **Alternativa**: Usar SMTP direto (requer backend)

---

## 📞 SUPORTE

- **EmailJS**: https://www.emailjs.com/docs/
- **Hostinger**: https://www.hostinger.pt/tutoriais/
- **Equipa**: suporte@algarvecharter.com

---

✅ **CONFIGURAÇÃO COMPLETA!**
