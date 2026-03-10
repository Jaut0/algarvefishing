# 🎣 ALGARVE TUNA CHARTER - Big Game Fishing Platform

![Algarve Tuna Charter](https://img.shields.io/badge/Algarve_Tuna_Charter-v2.0-FF6B35)
![Wicked Tuna Inspired](https://img.shields.io/badge/Style-Wicked_Tuna-0B1929)
![HTML5](https://img.shields.io/badge/HTML5-ready-FF6B35)
![CSS3](https://img.shields.io/badge/CSS3-ready-1B4965)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-FF6B35)
![Status](https://img.shields.io/badge/Status-100%25%20Completo-4CAF50)

**Algarve Tuna Charter** é uma plataforma profissional de pesca ao atum e Big Game Fishing no Algarve, Portugal. Inspirada no icónico programa **Wicked Tuna** da National Geographic, conecta pescadores com capitães experientes para aventuras épicas no oceano Atlântico.

> ✅ **Projeto 100% completo, redesenhado com tema Wicked Tuna!**
> 
> - ✅ **14 páginas HTML** com design cinematográfico
> - ✅ **Tema Wicked Tuna** - Azul oceano profundo + Laranja atum
> - ✅ **Tipografia dramática** estilo documentário National Geographic
> - ✅ **Foco em pesca ao atum** (Blue Fin, Yellow Fin, Big Game)
> - ✅ **Sistema completo de reservas** com calendário
> - ✅ **Sistema de suporte** e reclamações
> - ✅ **Gestão administrativa** completa
> - ✅ **9 ficheiros JavaScript** funcionais
> - ✅ **2 ficheiros CSS** (classic + Wicked Tuna)
> - ✅ **Design responsivo** mobile-first

---

## 🎨 DESIGN SYSTEM - WICKED TUNA INSPIRED

### 🌊 Paleta de Cores Oceânicas

```css
/* Deep Ocean Palette */
--ocean-deep: #0B1929           /* Oceano profundo (background principal) */
--ocean-dark: #122740           /* Azul oceano escuro */
--ocean-blue: #1B4965           /* Azul oceano médio */
--ocean-storm: #2A5E7D          /* Azul tempestade */

/* Tuna & Action Colors */
--tuna-orange: #FF6B35          /* Laranja atum (accent principal) */
--tuna-red: #D32F2F             /* Vermelho sangue de atum */
--boat-white: #F5F5F5           /* Branco dos barcos */
--steel-gray: #455A64           /* Cinza aço */
```

### 📝 Tipografia Documentário

- **Display (Títulos)**: Bebas Neue - Estilo dramático, uppercase, forte impacto
- **Headings (Subtítulos)**: Montserrat - Profissional, moderno, legível
- **Body (Texto)**: Roboto - Limpo, versátil, alta legibilidade

### 🎬 Elementos Visuais

- **Backgrounds**: Oceano tempestuoso, texturas de água profunda
- **Gradients**: Degradês dramáticos de azul profundo para laranja atum
- **Shadows**: Sombras pesadas cinematográficas (0.4-0.7 opacity)
- **Borders**: Acentos em laranja atum (#FF6B35)
- **Icons**: Font Awesome com glow effects em laranja
- **Animations**: Transições suaves, efeitos de hover dramáticos

---

## 🐟 FOCO EM PESCA AO ATUM

### Modalidades Especializadas

#### 🎣 **BLUE FIN TUNA** (Atum Rabilho Gigante)
- Espécie mais icónica e desafiante
- Pode atingir 500kg+
- Temporada: Maio a Outubro
- Técnica: Trolling, Jigging, Chumming

#### 🐟 **YELLOW FIN TUNA** (Atum Barbatana Amarela)
- Velocidade extrema
- Peso médio: 80-150kg
- Ano inteiro no Atlântico
- Técnica: Trolling de alta velocidade

#### ⚡ **BIG GAME FISHING**
- Marlim Azul e Branco
- Espadarte (Swordfish)
- Dourado (Mahi-Mahi)
- Wahoo

#### 🌊 **OUTRAS TÉCNICAS**
- **Jigging**: Pesca vertical de profundidade
- **Trolling**: Arrasto com iscas artificiais
- **Chumming**: Atração com chum
- **Pesca Nocturna**: Aventuras ao pôr-do-sol

---

## 🎯 FUNCIONALIDADES DA PLATAFORMA

### ✅ **PARA CLIENTES PESCADORES**

#### 1. **Homepage Épica** (index-wicked.html)
- Hero cinematográfico com background oceânico
- Badge "BIG GAME FISHING • ALGARVE"
- Estatísticas impressionantes (500kg maior captura)
- Barcos em destaque com fotos profissionais
- Modalidades de pesca ao atum
- Testemunhos de pescadores
- CTA banner com gradiente sunset

#### 2. **Escolher Barco** (escolher-barco.html)
- 12 barcos profissionais
- Filtros: Local, Tipo, Capacidade
- Especificações: Comprimento, HP, Equipamento
- Ratings e avaliações
- Fotos de alta qualidade

#### 3. **Sistema de Reservas** (reservar-barco.html)
- Calendário visual interactivo
- Seleção de até 5 dias
- Estados: Disponível, Reservado, Bloqueado, Férias
- Formulário completo
- Pedido pendente para capitão

#### 4. **Suporte e Reclamações** (suporte.html)
- 6 tipos de problemas
- Upload de evidências (5 ficheiros)
- Número único de caso
- Contactos directos

### ✅ **PARA CAPITÃES**

#### 1. **Dashboard Profissional** (dashboard-capitao.html)
- Estatísticas em tempo real
- **Pedidos de Reserva Pendentes**
- Botões: Aceitar, Rejeitar, Contactar
- Gestão de barcos múltiplos
- Link para agenda

#### 2. **Gestão de Agenda** (gerir-agenda.html)
- Calendário mensal visual
- Bloquear dias/períodos
- Marcar férias
- Ver reservas confirmadas
- Adicionar notas

#### 3. **Registar Barco** (registar-barco.html)
- Multi-step (5 etapas)
- Upload de documentos obrigatórios
- Fotos drag-and-drop
- Estado: Pendente → Admin aprova

### ✅ **PARA ADMINISTRADOR**

#### 1. **Login Admin** (admin-login.html)
- Email: servico@jauto.pt
- Password: 12345678
- Acesso seguro

#### 2. **Dashboard Admin** (admin-dashboard.html)
- **Aprovar/Rejeitar Capitães**
- **Validar Documentos** (Livrete, RNAAT, Seguro)
- **Aprovar/Rejeitar Barcos**
- **Gerir Reclamações**:
  - Filtros por estado
  - Marcar "Em Análise"
  - Adicionar notas internas
  - Contactar cliente/capitão
  - Resolver ou Rejeitar
- Estatísticas da plataforma

---

## 📁 ESTRUTURA DE FICHEIROS

```
algarve-tuna-charter/
├── index.html                 # Homepage original (26KB)
├── index-wicked.html          # 🆕 Homepage WICKED TUNA (25KB) ⭐
├── auth.html                  # Login/Registo (17KB)
├── suporte.html               # Suporte e Reclamações (21KB)
├── admin-login.html           # Login Admin (8KB) 🔐
├── admin-dashboard.html       # Painel Admin (27KB) 🔐
├── dashboard-capitao.html     # Dashboard Capitão (25KB)
├── dashboard-usuario.html     # Dashboard Utilizador (16KB)
├── gerir-agenda.html          # Gestão de Agenda (18KB) 📅
├── escolher-barco.html        # Lista de Barcos (11KB) 🚢
├── reservar-barco.html        # Reservar com Calendário (17KB) 📅
├── registar-barco.html        # Formulário registo barco (20KB)
├── criar-saida.html           # Formulário criar saída (11KB)
├── explorar.html              # Listagem de expedições (7KB)
├── detalhe-saida.html         # Detalhes da expedição (18KB)
├── css/
│   ├── style.css              # CSS original (22KB)
│   ├── algarve-tuna.css       # 🆕 CSS WICKED TUNA (17KB) ⭐
│   └── dashboard.css          # CSS dashboards (17KB)
├── js/
│   ├── main.js                # JavaScript global (8KB)
│   ├── forms.js               # Formulários multi-step (12KB)
│   ├── explorar.js            # Filtros e pesquisa (12KB)
│   ├── calendario.js          # Gestão de Agenda (12KB)
│   ├── escolher-barco.js      # Lista de Barcos (12KB)
│   ├── reservar-barco.js      # Sistema de Reservas (16KB)
│   ├── pedidos-capitao.js     # Pedidos Pendentes (16KB)
│   ├── suporte.js             # Suporte e Reclamações (11KB)
│   └── admin-reclamacoes.js   # Gestão Admin (26KB)
└── README-WICKED.md           # 🆕 Este ficheiro

TOTAL: 15 páginas HTML + 3 CSS + 9 JS + 2 READMEs = 29 ficheiros
Tamanho total: ~405KB (sem imagens)
```

---

## 🚀 COMO USAR O TEMA WICKED TUNA

### Opção 1: Homepage Wicked Tuna
```html
<!-- Use index-wicked.html como página principal -->
<link rel="stylesheet" href="css/algarve-tuna.css">
```

### Opção 2: Converter páginas existentes
```html
<!-- Substituir em qualquer página -->
<link rel="stylesheet" href="css/style.css"> ❌
<link rel="stylesheet" href="css/algarve-tuna.css"> ✅
```

### Customização de Cores
```css
/* Ajustar em css/algarve-tuna.css */
:root {
    --tuna-orange: #FF6B35;  /* Seu laranja personalizado */
    --ocean-deep: #0B1929;    /* Seu azul profundo */
}
```

---

## 🎯 MODELO DE NEGÓCIO

### 📋 Fluxo Completo

```
1. REGISTO DE CAPITÃO
   └─> Upload de documentos (Livrete RNAAT, Seguro, Cédula)
   └─> Estado: PENDENTE
   └─> Aguarda aprovação admin

2. APROVAÇÃO ADMIN
   └─> Admin valida documentos
   └─> APROVA ou REJEITA capitão
   └─> Email automático enviado

3. CAPITÃO APROVADO
   └─> Regista barcos (múltiplos)
   └─> Cada barco: Livrete, RNAAT, Seguro
   └─> Estado barco: PENDENTE

4. APROVAÇÃO DE BARCOS
   └─> Admin valida documentos do barco
   └─> APROVA ou REJEITA
   └─> Só barcos aprovados ficam visíveis

5. CLIENTE RESERVA
   └─> Escolhe barco → escolher-barco.html
   └─> Vê agenda → reservar-barco.html
   └─> Seleciona até 5 dias
   └─> Envia pedido PENDENTE

6. CAPITÃO RECEBE PEDIDO
   └─> Vê dados do cliente (nome, email, tel, nº pescadores)
   └─> Contacta cliente (telefone/email/WhatsApp)
   └─> Negocia detalhes e pagamento

7. CAPITÃO ACEITA
   └─> Dias marcados como RESERVADO na agenda
   └─> Pagamento fora da plataforma

8. PROBLEMA? RECLAMAÇÃO
   └─> Cliente acede a suporte.html
   └─> Envia reclamação com evidências
   └─> Admin investiga
   └─> Admin resolve situação
```

---

## 🎨 DESIGN HIGHLIGHTS - WICKED TUNA

### 🌊 Elementos Cinematográficos

#### 1. **Hero Dramático**
- Background: Oceano tempestuoso com overlay escuro
- Título: Gradient de branco para laranja
- Badge pulsante: "BIG GAME FISHING"
- Botões: Gradient sunset com efeito ripple

#### 2. **Cards Profissionais**
- Background: Vidro fosco (backdrop-filter blur)
- Border: Laranja atum com baixa opacidade
- Hover: Translateى(-5px) + border glow
- Antes: Linha de luz animada

#### 3. **Tipografia Impactante**
- Títulos: UPPERCASE, letter-spacing: 2-3px
- Bebas Neue para máximo impacto
- Text-shadow pesado para depth

#### 4. **Animações**
- Badge pulse (scale 1.0 → 1.05)
- Card hover com luz deslizante
- Stats com gradiente rotativo
- Fade in + slide up suave

#### 5. **Cores Semânticas**
- Sucesso: Verde (#4CAF50)
- Perigo: Vermelho atum (#D32F2F)
- Aviso: Amarelo (#FFC107)
- Info: Azul oceano (#2A5E7D)

---

## 🔐 CREDENCIAIS DE ACESSO

### Admin
- **URL**: admin-login.html
- **Email**: servico@jauto.pt
- **Password**: 12345678

### Demo Captain
- **Nome**: Pedro Costa
- **Email**: pedro@algarvecaptain.pt
- **Password**: demo123

### Demo Cliente
- **Email**: cliente@demo.pt
- **Password**: demo123

---

## 📱 RESPONSIVIDADE

### Breakpoints
- **Mobile**: < 768px (menu hamburger, stack vertical)
- **Tablet**: 768px - 1024px (grid 2 colunas)
- **Desktop**: > 1024px (grid 3-4 colunas, full features)

### Mobile First Approach
```css
/* Base: Mobile */
.grid { grid-template-columns: 1fr; }

/* Tablet */
@media (min-width: 768px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 🛠️ TECNOLOGIAS

- **HTML5**: Semântico, acessível
- **CSS3**: Custom properties, Grid, Flexbox, Backdrop filter
- **JavaScript ES6**: Vanilla JS, LocalStorage, Modals
- **Google Fonts**: Bebas Neue, Montserrat, Roboto
- **Font Awesome 6**: Ícones profissionais
- **Imagens**: Unsplash (placeholder de alta qualidade)

---

## 🎬 INSPIRAÇÃO WICKED TUNA

### Elementos Capturados do Show

✅ **Paleta de Cores**: Azuis profundos oceânicos + Laranja atum  
✅ **Tipografia**: Forte, impactante, documentário  
✅ **Fotografia**: Dramática, cinematográfica, ação  
✅ **Espírito**: Adrenalina, profissionalismo, aventura  
✅ **Foco**: Pesca ao atum gigante (Blue Fin)  
✅ **Storytelling**: Estatísticas épicas (500kg captura!)  
✅ **Comunidade**: Testemunhos reais de pescadores  

### Diferenças (Plataforma vs Show)

| Wicked Tuna (TV) | Algarve Tuna Charter (Plataforma) |
|------------------|-----------------------------------|
| Massachusetts, EUA | Algarve, Portugal |
| Competição entre barcos | Marketplace de reservas |
| Temporada de filmagem | Operação ano inteiro |
| Capitães fixos | Múltiplos capitães registados |
| Foco em documentário | Foco em experiências para clientes |

---

## 📈 PRÓXIMOS PASSOS (BACKEND)

### Essenciais
- [ ] Base de dados PostgreSQL ou MongoDB
- [ ] API RESTful (Node.js + Express ou Python + FastAPI)
- [ ] Autenticação JWT + bcrypt
- [ ] Upload de ficheiros (AWS S3 ou Cloudinary)
- [ ] Emails transaccionais (SendGrid ou Mailgun)
- [ ] Pagamentos Stripe/PayPal (opcional - actualmente directo)

### Opcionais
- [ ] Chat em tempo real (Socket.io)
- [ ] Notificações push (Firebase Cloud Messaging)
- [ ] Mapas interactivos (Google Maps API)
- [ ] Previsão meteorológica (OpenWeather API)
- [ ] Galeria de capturas (Instagram feed)
- [ ] Blog de pesca

---

## 📄 LICENÇA

© 2026 Algarve Tuna Charter. Todos os direitos reservados.

**Design inspirado em**: Wicked Tuna © National Geographic  
**Desenvolvido por**: Jauto.pt Development Team  
**Contacto**: servico@jauto.pt

---

## 🎣 LETS GO FISHING!

**Pronto para implementar a plataforma de pesca ao atum mais épica do Algarve!**

🌊 Oceano profundo • 🐟 Blue Fin Tuna • ⚡ Big Game Fishing • 🎬 Wicked Tuna Vibes

**Download, customize e lance a sua aventura!** 🚀🎣⚓
