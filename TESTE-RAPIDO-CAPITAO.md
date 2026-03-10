# 🧪 Teste Rápido - Registo de Capitão

## 🎯 Opção 1: Via Homepage (Recomendado)

1. **Abrir** `index.html`
2. **Scroll down** até à secção "Junte-se à Nossa Frota"
3. **Clicar** no botão laranja **"Registar como Capitão"**
4. ✅ A página auth.html abrirá automaticamente no tab "Registar" com os campos de capitão visíveis

---

## 🎯 Opção 2: Via URL Direto

1. **Abrir** o navegador
2. **Navegar para**: `auth.html?tipo=capitao`
3. ✅ A página abrirá automaticamente no tab "Registar" com os campos de capitão visíveis

---

## 🎯 Opção 3: Manual

1. **Abrir** `auth.html`
2. **Clicar** no tab **"Registar"** (no topo)
3. **Selecionar** a opção **"Capitão"** (com ícone de barco 🚢)
4. ✅ Os campos de documentação obrigatória aparecerão

---

## 📋 Campos Obrigatórios para Capitão

### Dados Pessoais
- ✅ Nome Completo
- ✅ Email
- ✅ Telefone
- ✅ Password
- ✅ Confirmar Password

### Dados de Capitão
- ✅ Anos de Experiência
- ✅ Porto de Origem (ex: Portimão, Olhão, Faro)

### Documentação Obrigatória (3 ficheiros)
1. **📄 Livrete** (PDF/Imagem) - Livrete da embarcação
2. **📄 RNAAT** (PDF/Imagem) - Registo Nacional de Aluguer de Atividades Turísticas
3. **📄 Certificado de Seguro** (PDF/Imagem) - Seguro marítimo válido

### Termos
- ✅ Aceitar Termos e Condições

---

## ⚠️ Comportamento Esperado

Ao submeter o formulário:

1. **Toast de aviso** aparece: "Conta criada! Aguarde aprovação da administração."
2. **Alert** aparece explicando que a conta ficará pendente
3. **Redirect** para `index.html`
4. A conta fica no estado **PENDENTE** até o admin aprovar

---

## 🔍 Verificar Aprovação (Admin)

1. **Abrir** `admin-login.html`
2. **Credenciais**:
   - Email: `servico@jauto.pt`
   - Password: `12345678`
3. **Ir para** secção "Capitães Pendentes"
4. **Rever** os 3 documentos obrigatórios
5. **Aprovar** ou **Rejeitar** o capitão

---

## 🎨 Aparência Esperada

Quando selecionar "Capitão", deve aparecer:

```
┌────────────────────────────────────────┐
│  ⚠️  Documentação Obrigatória          │
│                                        │
│  A sua conta ficará pendente até      │
│  validação dos 3 documentos pela      │
│  administração.                        │
└────────────────────────────────────────┘

📄 Livrete (PDF/Imagem) *
[Escolher ficheiro]

📄 RNAAT (PDF/Imagem) *
[Escolher ficheiro]

📄 Certificado de Seguro (PDF/Imagem) *
[Escolher ficheiro]

🎓 Anos de Experiência *
[5]

⚓ Porto de Origem *
[Portimão]
```

---

## ✅ Checklist de Validação

- [ ] O tab "Registar" abre automaticamente via link do index
- [ ] Os campos de capitão aparecem ao selecionar "Capitão"
- [ ] Os 3 uploads de documentos são obrigatórios
- [ ] O campo "Cédula Marítima" **NÃO** aparece (foi removido)
- [ ] Aparecem os campos: Livrete, RNAAT, Seguro
- [ ] O formulário não submete sem os 3 documentos
- [ ] Após submissão, aparece mensagem de pendência
- [ ] No admin, o capitão aparece como "PENDENTE"

---

## 🐛 Problemas Conhecidos Resolvidos

- ✅ **Campo "Cédula Marítima"** foi removido
- ✅ **"Livrete RNAAT"** foi separado em dois campos: "Livrete" e "RNAAT"
- ✅ Todos os 3 documentos são **obrigatórios**
- ✅ CSS `algarve-tuna.css` aplicado
- ✅ Link direto `?tipo=capitao` funcional

---

## 📞 Contacto em Caso de Erro

Se encontrar algum problema:
1. Abrir **Console do navegador** (F12)
2. Verificar erros de JavaScript
3. Tirar screenshot
4. Reportar o problema
