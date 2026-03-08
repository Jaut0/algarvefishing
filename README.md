# 🎣 Algarve Tuna Charter

Plataforma completa de gestão e reserva de saídas de pesca charter no Algarve. Big Game Fishing especializado em Blue Fin Tuna e outras espécies pelágicas.

## 🚀 Deploy

Este projeto está hospedado na Vercel.

## 🌟 Funcionalidades

### Para Clientes
- ✅ Registo e login
- ✅ Explorar saídas de pesca
- ✅ Reservar saídas
- ✅ Saídas partilhadas (dividir custos)
- ✅ Dashboard pessoal
- ✅ Sistema de suporte

### Para Capitães
- ✅ Registo com aprovação
- ✅ Gestão de barcos
- ✅ Criar saídas de pesca
- ✅ Gerir agenda e disponibilidade
- ✅ Saídas partilhadas
- ✅ Sistema de alertas de segurança
- ✅ Dashboard profissional

### Para Administração
- ✅ Painel de administração
- ✅ Aprovar/rejeitar capitães
- ✅ Validar documentos
- ✅ Gerir reclamações
- ✅ Relatórios e estatísticas

## 🛠️ Tecnologias

- HTML5
- CSS3 (Design System customizado)
- JavaScript Vanilla
- LocalStorage (dados simulados)
- Font Awesome Icons
- Vercel (Hospedagem)

## 📦 Estrutura

```
algarve-tuna-charter/
├── index.html              # Página principal
├── auth.html              # Login/Registo
├── admin-login.html       # Login admin
├── admin-dashboard.html   # Painel admin
├── dashboard-capitao.html # Dashboard capitão
├── dashboard-usuario.html # Dashboard cliente
├── criar-saida.html       # Criar nova saída
├── explorar.html          # Explorar saídas
├── detalhe-saida.html     # Detalhes da saída
├── reservar-barco.html    # Reservar barco
├── registar-barco.html    # Registar barco
├── escolher-barco.html    # Escolher barco
├── gerir-agenda.html      # Gerir agenda
├── agenda-barco.html      # Agenda do barco
├── suporte.html           # Suporte ao cliente
├── alertas-seguranca.html # Alertas (capitães)
├── confirmar-email.html   # Confirmação de email
├── caixa-email.html       # Ver emails simulados
├── css/                   # Estilos
│   ├── algarve-tuna.css
│   ├── style.css
│   └── dashboard.css
└── js/                    # Scripts
    ├── main.js
    ├── forms.js
    ├── explorar.js
    ├── calendario.js
    ├── escolher-barco.js
    ├── reservar-barco.js
    ├── pedidos-capitao.js
    ├── suporte.js
    ├── admin-reclamacoes.js
    └── alertas-seguranca.js
```

## 🧪 Como Testar

### Cliente Privado
```
1. Abrir: auth.html
2. Tab "Registar" → Selecionar "Privado"
3. Preencher dados
4. Console (F12) → Copiar link de confirmação
5. Confirmar email
6. Fazer login
```

### Capitão
```
1. Abrir: auth.html?tipo=capitao
2. Preencher todos os campos + documentos
3. Admin aprova em: admin-login.html
   - Email: servico@jauto.pt
   - Password: 12345678
4. Confirmar email
5. Fazer login
```

### Admin
```
URL: admin-login.html
Email: servico@jauto.pt
Password: 12345678
```

## 📝 Notas Importantes

### Sistema de Dados
- **LocalStorage:** Dados guardados localmente no navegador
- **Emails Simulados:** Ver em console (F12) ou caixa-email.html
- **Sem Backend:** Sistema frontend puro

### Para Produção Real
Para implementar em ambiente real com dados persistentes:
1. Backend (Node.js/PHP/Python)
2. Base de dados (MySQL/PostgreSQL/MongoDB)
3. Serviço de email (SendGrid/AWS SES)
4. Sistema de pagamentos (Stripe/PayPal)
5. Autenticação JWT
6. API RESTful

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
# 1. Instalar Vercel CLI (opcional)
npm i -g vercel

# 2. Deploy
vercel

# Ou conectar via GitHub:
# → Vercel Dashboard
# → Import Git Repository
# → Deploy automático
```

## 📈 Funcionalidades Futuras

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
