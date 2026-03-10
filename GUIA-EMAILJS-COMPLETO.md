# 📧 GUIA COMPLETO: CONFIGURAÇÃO EMAILJS + HOSTINGER

## 🎯 SISTEMA IMPLEMENTADO

O sistema de emails com **ativação por email** está 100% implementado!

### ✅ Funcionalidades
- ✉️ Email de ativação para **Capitães** (com link único)
- ✉️ Email de ativação para **Clientes** (com link único)
- 📧 Email de nova reserva para **Capitão**
- 📧 Email de confirmação para **Cliente**
- 🔐 Sistema de tokens seguros (expira em 24h)
- 🧹 Limpeza automática de tokens expirados
- 🚫 Bloqueio de login para contas não ativadas

---

## 📋 PASSO 1: CRIAR CONTA NO EMAILJS

### 1.1 Registar-se
1. Acesse: **https://www.emailjs.com/**
2. Clique em **"Sign Up"** (canto superior direito)
3. Preencha:
   - Email: `admin@algarvetunacharter.pt` (ou seu email pessoal)
   - Password: [crie uma senha forte]
4. Confirme o email (verifique sua caixa de entrada)

---

## 📋 PASSO 2: ADICIONAR SERVIÇO SMTP (HOSTINGER)

### 2.1 Criar Email Service
1. Faça login no EmailJS
2. No menu lateral esquerdo, clique em **"Email Services"**
3. Clique no botão **"Add New Service"**
4. Escolha **"Custom SMTP Server"**

### 2.2 Configurar SMTP
Preencha os campos:

```
Service Name: Hostinger SMTP
SMTP Server: smtp.hostinger.com
Port: 587
Security: TLS (ou 465 para SSL)
Username: noreply@algarvetunacharter.pt
Password: [senha da conta Hostinger]
Sender Name: Algarve Charter
Sender Email: noreply@algarvetunacharter.pt
```

### 2.3 Testar Conexão
1. Clique em **"Test Connection"**
2. Se aparecer ✅ "Connection Successful", clique em **"Create Service"**
3. **⚠️ COPIE O SERVICE ID** (ex: `service_abc123xyz`)
   - Guarde este ID num bloco de notas!

---

## 📋 PASSO 3: CRIAR OS 4 TEMPLATES DE EMAIL

No EmailJS, vá para **"Email Templates"** → **"Create New Template"**

---

### 🔹 TEMPLATE 1: Ativação de Capitão

**Clique em "Create New Template" e preencha:**

#### **Settings (aba Settings)**
```
Template Name: Ativação Capitão
```

#### **Content (aba Content)**

**Subject:**
```
[ALGARVE CHARTER] Ative a sua conta de Capitão
```

**Body (HTML):**
```html
<h2>Olá {{capitao_nome}},</h2>

<p>Bem-vindo à <strong>Algarve Charter</strong>! ⚓</p>

<p>Para ativar a sua conta de capitão, clique no botão abaixo:</p>

<a href="{{link_ativacao}}" style="display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
  ✅ ATIVAR MINHA CONTA
</a>

<p>Ou copie este link no navegador:</p>
<p><code>{{link_ativacao}}</code></p>

<hr>

<p><strong>Código de ativação:</strong> {{token_ativacao}}</p>
<p><strong>Validade:</strong> {{validade_horas}} horas</p>
<p><strong>Data de registo:</strong> {{data_registo}}</p>

<hr>

<p style="color: #666; font-size: 0.9em;">
  ⚠️ Se não foi você que se registou, ignore este email.<br>
  Este link expira em 24 horas.
</p>

<p>Boas pescas! 🎣<br>
<strong>Equipa Algarve Charter</strong></p>
```

**To Email:**
```
{{to_email}}
```

**From Name:**
```
{{from_name}}
```

**Reply To:**
```
{{reply_to}}
```

**Clique em "Save"** → **⚠️ COPIE O TEMPLATE ID** (ex: `template_abc123`)

---

### 🔹 TEMPLATE 2: Ativação de Cliente

**Criar novo template:**

**Subject:**
```
[ALGARVE CHARTER] Confirme o seu registo
```

**Body (HTML):**
```html
<h2>Olá {{cliente_nome}},</h2>

<p>Bem-vindo à <strong>Algarve Charter</strong>! 🎣</p>

<p>Para ativar a sua conta, clique no botão abaixo:</p>

<a href="{{link_ativacao}}" style="display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
  ✅ ATIVAR MINHA CONTA
</a>

<p>Ou copie este link no navegador:</p>
<p><code>{{link_ativacao}}</code></p>

<hr>

<p><strong>Próximos passos após ativar:</strong></p>
<ul>
  <li>🔍 Explore nossas expedições de pesca</li>
  <li>🚤 Reserve barcos com capitães experientes</li>
  <li>🐟 Viva a melhor experiência de pesca no Algarve</li>
</ul>

<p><a href="{{link_explorar}}" style="color: #0066cc;">👉 Explorar Expedições</a></p>

<hr>

<p style="color: #666; font-size: 0.9em;">
  ⚠️ Este link expira em {{validade_horas}} horas.<br>
  Não recebeu o email? Verifique a pasta de spam.
</p>

<p>Boas pescas! 🎣<br>
<strong>Equipa Algarve Charter</strong></p>
```

**To Email:** `{{to_email}}`  
**From Name:** `{{from_name}}`  
**Reply To:** `{{reply_to}}`

**Salvar e copiar Template ID**

---

### 🔹 TEMPLATE 3: Nova Reserva (para Capitão)

**Criar novo template:**

**Subject:**
```
[NOVA RESERVA] {{cliente_nome}} - {{datas_selecionadas}}
```

**Body (HTML):**
```html
<h2>🚤 NOVA RESERVA RECEBIDA!</h2>

<p>Olá <strong>{{capitao_nome}}</strong>,</p>

<p>Você recebeu uma nova reserva na plataforma Algarve Charter:</p>

<hr>

<h3>👤 CLIENTE</h3>
<ul>
  <li><strong>Nome:</strong> {{cliente_nome}}</li>
  <li><strong>Email:</strong> {{cliente_email}}</li>
  <li><strong>Telefone:</strong> {{cliente_telefone}}</li>
</ul>

<h3>🚤 DETALHES DA RESERVA</h3>
<ul>
  <li><strong>Barco:</strong> {{barco_nome}}</li>
  <li><strong>Datas:</strong> {{datas_selecionadas}}</li>
  <li><strong>Nº de Pescadores:</strong> {{num_pescadores}}</li>
</ul>

<h3>💬 MENSAGEM DO CLIENTE</h3>
<p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #0066cc;">
  {{mensagem_cliente}}
</p>

<hr>

<p><strong>Data do pedido:</strong> {{data_pedido}}</p>

<a href="{{link_dashboard}}" style="display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
  📋 VER NO DASHBOARD
</a>

<hr>

<p style="color: #666; font-size: 0.9em;">
  Esta é uma notificação automática.<br>
  Para responder ao cliente, use: {{cliente_email}} ou {{cliente_telefone}}
</p>

<p>Boas pescas! 🎣<br>
<strong>Equipa Algarve Charter</strong></p>
```

**To Email:** `{{to_email}}`  
**From Name:** `{{from_name}}`  
**Reply To:** `{{reply_to}}`

**Salvar e copiar Template ID**

---

### 🔹 TEMPLATE 4: Confirmação de Reserva (para Cliente)

**Criar novo template:**

**Subject:**
```
[ALGARVE CHARTER] Reserva Enviada! ✅
```

**Body (HTML):**
```html
<h2>Olá {{cliente_nome}},</h2>

<p>Sua reserva foi enviada com sucesso! 📧</p>

<hr>

<h3>🚤 RESUMO DA RESERVA</h3>
<ul>
  <li><strong>Barco:</strong> {{barco_nome}}</li>
  <li><strong>Capitão:</strong> {{capitao_nome}}</li>
  <li><strong>Datas:</strong> {{datas_selecionadas}}</li>
  <li><strong>Nº de Pescadores:</strong> {{num_pescadores}}</li>
</ul>

<hr>

<h3>⏳ PRÓXIMOS PASSOS</h3>
<ol>
  <li>O capitão receberá a sua reserva</li>
  <li>Ele entrará em contacto em até <strong>48 horas</strong></li>
  <li>Você pode acompanhar o status no dashboard</li>
</ol>

<a href="{{link_dashboard}}" style="display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
  📋 ACOMPANHAR RESERVA
</a>

<hr>

<p><strong>Data do pedido:</strong> {{data_pedido}}</p>

<p style="color: #666; font-size: 0.9em;">
  Em caso de dúvidas, contacte-nos:<br>
  📧 reservas@algarvetunacharter.pt
</p>

<p>Boas pescas! 🎣<br>
<strong>Equipa Algarve Charter</strong></p>
```

**To Email:** `{{to_email}}`  
**From Name:** `{{from_name}}`  
**Reply To:** `{{reply_to}}`

**Salvar e copiar Template ID**

---

## 📋 PASSO 4: OBTER PUBLIC KEY

1. No EmailJS, clique no seu **avatar** (canto superior direito)
2. Vá para **"Account"** ou **"API Keys"**
3. Procure por **"Public Key"** ou **"User ID"**
4. **⚠️ COPIE A PUBLIC KEY** (ex: `abc123XYZ456`)

---

## 📋 PASSO 5: ATUALIZAR O FICHEIRO `js/email-config.js`

Abra o ficheiro `js/email-config.js` e **substitua**:

```javascript
const EMAIL_CONFIG = {
    // IDs do EmailJS (substituir após criar conta)
    serviceID: 'service_xxxxxxx',  // ⬅️ COLE SEU SERVICE ID AQUI
    
    // Templates
    templates: {
        ativacaoCapitao: 'template_xxxxxx',  // ⬅️ Template 1
        ativacaoCliente: 'template_xxxxxx',  // ⬅️ Template 2
        reservaCapitao: 'template_xxxxxx',   // ⬅️ Template 3
        reservaCliente: 'template_xxxxxx',   // ⬅️ Template 4
        suporte: 'template_suporte_xxx'      // (opcional, criar depois)
    },
    
    // Public Key (obter no dashboard EmailJS)
    publicKey: 'YOUR_PUBLIC_KEY_HERE',  // ⬅️ COLE SUA PUBLIC KEY AQUI
    
    // Emails do sistema
    emails: {
        noreply: 'noreply@algarvetunacharter.pt',  // ⬅️ SEU EMAIL
        admin: 'admin@algarvetunacharter.pt',
        reservas: 'reservas@algarvetunacharter.pt',
        suporte: 'suporte@algarvetunacharter.pt',
        capitao: 'capitao@algarvetunacharter.pt'
    }
};
```

**Exemplo preenchido:**
```javascript
const EMAIL_CONFIG = {
    serviceID: 'service_abc123xyz',
    
    templates: {
        ativacaoCapitao: 'template_def456',
        ativacaoCliente: 'template_ghi789',
        reservaCapitao: 'template_jkl012',
        reservaCliente: 'template_mno345',
        suporte: 'template_pqr678'
    },
    
    publicKey: 'xYz123ABC456',
    
    emails: {
        noreply: 'noreply@algarvetunacharter.pt',
        admin: 'admin@algarvetunacharter.pt',
        reservas: 'reservas@algarvetunacharter.pt',
        suporte: 'suporte@algarvetunacharter.pt',
        capitao: 'capitao@algarvetunacharter.pt'
    }
};
```

---

## 📋 PASSO 6: FAZER DEPLOY

```bash
cd C:\Users\servi\Desktop\algarvefishing
git add .
git commit -m "✅ Sistema de ativação por email completo"
git push
```

Aguarde 2-3 minutos para o deploy no Vercel.

---

## 🧪 PASSO 7: TESTAR O SISTEMA

### Teste 1: Registo de Cliente
1. Acesse: https://algarvefishing.vercel.app/auth.html
2. Clique em **"Registar"**
3. Escolha **"Cliente"**
4. Preencha com um email REAL seu
5. Clique em **"Criar Conta"**
6. ✅ Deve aparecer: "Email de ativação enviado!"
7. Verifique sua caixa de entrada (e spam!)
8. Clique no link de ativação
9. ✅ Deve aparecer: "Conta Ativada!"
10. Faça login → Deve funcionar ✅

### Teste 2: Registo de Capitão
1. Repita o teste acima escolhendo **"Capitão"**
2. Preencha experiência, porto e faça upload de documentos
3. Verifique o email de ativação
4. Ative e faça login

### Teste 3: Reserva de Barco
1. Faça login como cliente
2. Escolha um barco
3. Faça uma reserva
4. ✅ Capitão deve receber email
5. ✅ Cliente deve receber confirmação

---

## ❗ TROUBLESHOOTING

### Problema: "EmailJS não carregado"
**Solução:** Verifique se o script está em `auth.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script src="js/email-config.js"></script>
```

### Problema: Email não chega
**Causas possíveis:**
1. Service ID, Template ID ou Public Key errados
2. Senha SMTP incorreta
3. Email bloqueado como spam
4. Cota do EmailJS esgotada (200 emails/mês no plano grátis)

**Solução:**
1. Abra o console do navegador (F12)
2. Procure por erros (❌ vermelho)
3. Verifique os IDs no `email-config.js`
4. Teste a conexão SMTP no EmailJS

### Problema: "Conta não ativada" ao fazer login
**Isso é normal!** O sistema está funcionando corretamente.  
O usuário DEVE clicar no link do email antes de fazer login.

---

## 📊 COMANDOS ÚTEIS (Console do Navegador)

Abra o console (F12 → Console) e digite:

```javascript
// Ver estatísticas do sistema
estatisticasAtivacao()

// Ver quantos tokens pendentes existem
verificarTokensPendentes()

// Limpar tokens expirados manualmente
limparTokensExpirados()

// Ativar conta manualmente (emergência)
ativarContaManualmente('email@exemplo.com')
```

---

## ✅ CHECKLIST FINAL

- [ ] Conta criada no EmailJS
- [ ] Serviço SMTP Hostinger configurado
- [ ] 4 templates de email criados
- [ ] Service ID copiado
- [ ] Template IDs copiados
- [ ] Public Key copiada
- [ ] Ficheiro `js/email-config.js` atualizado
- [ ] Deploy feito (`git push`)
- [ ] Teste de registo realizado
- [ ] Email de ativação recebido
- [ ] Conta ativada com sucesso
- [ ] Login funcionando

---

## 🎉 SISTEMA PRONTO!

Agora você tem um **sistema profissional de ativação por email**!

**Benefícios:**
✅ Emails validados automaticamente  
✅ Sem contas falsas  
✅ Segurança com tokens únicos  
✅ Limpeza automática de tokens expirados  
✅ Notificações de reservas em tempo real  

**Custos:**
- EmailJS: **GRÁTIS** até 200 emails/mês
- Hostinger Email: **€0.99/mês** ou **€3.99/mês**

**Total: €0.99 - €3.99/mês** 🎯

---

## 📞 SUPORTE

Se tiver problemas:
1. Abra o console do navegador (F12)
2. Procure por erros
3. Verifique o `email-config.js`
4. Teste a conexão SMTP no EmailJS

Boa sorte! 🚀🎣
