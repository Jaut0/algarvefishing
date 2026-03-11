# Política de Segurança — Algarve Fishing Platform

## Credenciais e Chaves

### Admin Login
- A password do admin **nunca é armazenada em plaintext** no código-fonte
- O sistema usa hash SHA-256 (via Web Crypto API nativa do browser)
- Para alterar a password: gere o hash via `echo -n "NovaPassword" | sha256sum` e atualize `ADMIN_HASH` em `admin-login.html`

### EmailJS (Chaves Públicas)
- O `serviceID`, `templateID` e `publicKey` do EmailJS são **intencionalmente públicos** — o EmailJS é uma solução client-side por design
- Para limitar uso indevido, configure **restrições de domínio** no painel EmailJS (https://dashboard.emailjs.com)
- Adicione apenas o domínio de produção (ex: `algarvetunacharter.pt`) como domínio autorizado

## Checklist antes de fazer git push
- [ ] Nenhuma password em plaintext nos ficheiros `.html` ou `.js`
- [ ] Nenhum email/password de admin visível nos ficheiros de teste
- [ ] `reset-system.html` não contém credenciais reais
- [ ] `teste-registo-cliente.html` não tem valores pré-preenchidos com passwords

## Contacto de Segurança
Para reportar vulnerabilidades: admin@algarvetunacharter.pt
