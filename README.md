# 🎣 Algarve Tuna Charter

Plataforma completa de gestão e reserva de saídas de pesca charter no Algarve. Big Game Fishing especializado em Blue Fin Tuna e outras espécies pelágicas.

## 🚀 Deploy

Este projeto está hospedado na Vercel.

**URL de produção:** https://algarvefishing.vercel.app

## 🌟 Funcionalidades

### ✅ Sistema de Autenticação com Ativação por Email (NOVO!)
- 📧 Registo com ativação obrigatória por email
- 🔐 Tokens seguros (expira em 24h)
- ✉️ Emails automáticos via EmailJS + Hostinger SMTP
- 🧹 Limpeza automática de tokens expirados
- 🚫 Bloqueio de login para contas não ativadas

### Para Clientes
- ✅ Registo e login com ativação por email
- ✅ Explorar saídas de pesca (29 zonas do Algarve)
- ✅ Filtros avançados (localização, tipo, duração, preço)
- ✅ Reservar saídas (com notificação por email)
- ✅ Saídas partilhadas (dividir custos)
- ✅ Dashboard pessoal responsivo
- ✅ Sistema de suporte

### Para Capitães
- ✅ Registo com ativação por email e upload de documentos
- ✅ Gestão de barcos (formulário simplificado - 4 passos)
- ✅ Criar saídas de pesca (7 tipos incluindo Torneio)
- ✅ Gerir agenda e disponibilidade
- ✅ Receber notificações de reservas por email
- ✅ Saídas partilhadas
- ✅ Sistema de alertas de segurança
- ✅ Dashboard profissional

### Para Administração
- ✅ Painel de administração
- ✅ Aprovar/rejeitar capitães
- ✅ Validar documentos
- ✅ Gerir reclamações
- ✅ Relatórios e estatísticas

## 📧 Sistema de Emails (EmailJS + Hostinger)

O projeto inclui um **sistema completo de emails automáticos**:

### Fluxos de Email Implementados:
1. **Email de Ativação (Capitão)** → Enviado após registo, com link único
2. **Email de Ativação (Cliente)** → Enviado após registo, com link único
3. **Email de Nova Reserva (Capitão)** → Notificação quando recebe reserva
4. **Email de Confirmação (Cliente)** → Confirmação de envio da reserva

### Configuração:
- ✅ Ficheiro de configuração: `js/email-config.js`
- ✅ Templates prontos para EmailJS
- ✅ Integração com Hostinger SMTP
- ✅ Guia completo de setup: `GUIA-EMAILJS-COMPLETO.md`

### Custos:
- EmailJS: **GRÁTIS** até 200 emails/mês
- Hostinger Email: **€0.99 - €3.99/mês**

## 🛠️ Tecnologias

- HTML5
- CSS3 (Design System customizado)
- JavaScript Vanilla
- LocalStorage (dados simulados)
- Font Awesome Icons
- EmailJS (sistema de emails)
- Hostinger SMTP (servidor de email)
- Vercel (Hospedagem)

## 📦 Estrutura

```
algarve-tuna-charter/
├── index.html              # Página principal
├── auth.html               # Login/Registo (com ativação por email)
├── ativar-conta.html       # Página de ativação de conta (NOVO)
├── admin-login.html        # Login admin
├── admin-dashboard.html    # Painel admin
├── dashboard-capitao.html  # Dashboard capitão
├── dashboard-usuario.html  # Dashboard cliente
├── criar-saida.html        # Criar nova saída (7 tipos)
├── explorar.html           # Explorar saídas (29 zonas Algarve)
├── detalhe-saida.html      # Detalhes da saída
├── reservar-barco.html     # Reservar barco (com emails)
├── registar-barco.html     # Registar barco (4 passos)
├── escolher-barco.html     # Escolher barco
├── gerir-agenda.html       # Gerir agenda
├── agenda-barco.html       # Agenda do barco
├── suporte.html            # Suporte ao cliente
├── alertas-seguranca.html  # Alertas (capitães)
├── confirmar-email.html    # Confirmação de email
├── caixa-email.html        # Ver emails simulados
├── GUIA-EMAILJS-COMPLETO.md # Guia de configuração EmailJS (NOVO)
├── css/                    # Estilos
│   ├── algarve-tuna.css
│   ├── style.css
│   └── dashboard.css
└── js/                     # Scripts
    ├── main.js
    ├── forms.js
    ├── explorar.js
    ├── calendario.js
    ├── escolher-barco.js
    ├── reservar-barco.js    # Com emails de reserva
    ├── pedidos-capitao.js
    ├── suporte.js
    ├── admin-reclamacoes.js
    ├── alertas-seguranca.js
    ├── email-config.js       # Configuração EmailJS (NOVO)
    └── limpeza-tokens.js     # Limpeza automática (NOVO)
```
```

## 🧪 Como Testar

### ⚠️ IMPORTANTE: Configurar EmailJS primeiro!
Antes de testar, configure o EmailJS seguindo o guia: **`GUIA-EMAILJS-COMPLETO.md`**

### Cliente
```
1. Abrir: https://algarvefishing.vercel.app/auth.html
2. Tab "Registar" → Selecionar "Cliente"
3. Preencher dados com email REAL
4. Clicar em "Criar Conta"
5. Verificar email (caixa de entrada ou spam)
6. Clicar no link de ativação
7. Fazer login na plataforma
```

### Capitão
```
1. Abrir: https://algarvefishing.vercel.app/auth.html
2. Tab "Registar" → Selecionar "Capitão"
3. Preencher todos os campos + fazer upload de documentos
4. Email REAL obrigatório
5. Verificar email de ativação
6. Clicar no link de ativação
7. Fazer login no dashboard de capitão
```

### Teste de Reserva
```
1. Login como cliente
2. Explorar → Escolher uma saída
3. Reservar barco
4. ✅ Capitão recebe email com detalhes
5. ✅ Cliente recebe email de confirmação
```

### Admin
```
URL: https://algarvefishing.vercel.app/admin-login.html
Email: servico@jauto.pt
Password: 12345678
```

## 📝 Notas Importantes

### Sistema de Dados
- **LocalStorage:** Dados guardados localmente no navegador
- **Emails Reais:** Via EmailJS + Hostinger SMTP
- **Ativação Obrigatória:** Tokens expiram em 24h
- **Sem Backend:** Sistema frontend puro

### Sistema de Segurança
- 🔐 Tokens únicos por registo
- ⏰ Expiração automática (24h)
- 🧹 Limpeza automática de tokens expirados
- 🚫 Login bloqueado até ativar email
- ✅ Validação de email obrigatória

### Para Produção Real
Para implementar em ambiente real com dados persistentes:
1. ✅ **EmailJS + Hostinger SMTP** (JÁ IMPLEMENTADO!)
2. Backend (Node.js/PHP/Python) para processar pagamentos
3. Base de dados (MySQL/PostgreSQL/MongoDB) para dados persistentes
4. Sistema de pagamentos (Stripe/PayPal/Multibanco)
5. Autenticação JWT para maior segurança
6. API RESTful para integração com apps mobile
7. Backup automático de dados
8. CDN para imagens dos barcos (Cloudinary/AWS S3)

## 🎨 Design

- **Tema:** Big Game Fishing
- **Cores:** Azul marinho + Laranja
- **Tipografia:** Bebas Neue (títulos) + Inter (corpo)
- **Responsivo:** Mobile, Tablet, Desktop
- **Imagens:** Pesca de alto mar real

## 🔐 Credenciais de Teste

### Admin
- Email: `servico@jauto.pt`
- Password: `12345678`

### Cliente Teste
- Criar novo em auth.html

### Capitão Teste
- Criar novo em auth.html?tipo=capitao
- Aguardar aprovação admin

## 🚀 Deploy na Vercel

```bash
# 1. Fazer alterações
git add .
git commit -m "Sua mensagem"
git push

# Deploy automático em 2-3 minutos!
```

## 🛠️ Comandos Úteis (Console do Navegador)

Abra o console (F12 → Console) para usar estes comandos administrativos:

```javascript
// Ver estatísticas do sistema de ativação
estatisticasAtivacao()

// Ver quantos tokens pendentes existem
verificarTokensPendentes()

// Limpar tokens expirados manualmente
limparTokensExpirados()

// Ativar conta manualmente (emergência se email não chegar)
ativarContaManualmente('email@exemplo.com')

// Limpar todos os dados (reset completo)
localStorage.clear()
location.reload()
```

## 📈 Funcionalidades Futuras

- [x] Sistema de emails com ativação (CONCLUÍDO ✅)
- [x] Filtros de localização por zonas do Algarve (CONCLUÍDO ✅)
- [x] Dashboard responsivo (CONCLUÍDO ✅)
- [ ] Backend real com Node.js
- [ ] Base de dados PostgreSQL
- [ ] Emails reais (SendGrid)
- [ ] Pagamentos online (Stripe)
- [ ] App mobile (React Native)
- [ ] Sistema de avaliações
- [ ] Chat em tempo real
- [ ] Notificações push
- [ ] Multi-idioma (EN/PT/ES/FR)
- [ ] Blog de pesca

## 👨‍💻 Desenvolvimento

Desenvolvido para Big Game Fishing no Algarve 🎣

### Tecnologias Core
- Vanilla JavaScript (sem frameworks)
- CSS3 com variáveis customizadas
- HTML5 semântico
- LocalStorage API
- Fetch API (futuro)

### Compatibilidade
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 📄 Licença

© 2026 FishingHub Algarve. Todos os direitos reservados.

---

**🎣 Tornando a pesca de alto mar acessível para todos! 🌊**
