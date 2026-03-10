# 🎯 INSTRUÇÕES FINAIS - SUPER SIMPLES

## ✅ O QUE VOCÊ JÁ FEZ (espero!)
1. ✅ Criou conta no Hostinger
2. ✅ Criou email `noreply@algarvetunacharter.pt`
3. ✅ Criou conta no EmailJS
4. ✅ Adicionou serviço SMTP no EmailJS
5. ✅ Criou 4 templates de email
6. ✅ Copiou todos os IDs para o Bloco de Notas

---

## 📝 PASSO FINAL: EDITAR O FICHEIRO

### 1. Abra o ficheiro:
```
C:\Users\servi\Desktop\algarvefishing\js\email-config.js
```

### 2. Procure estas linhas (estão no TOPO do ficheiro):

```javascript
serviceID: 'COLE_SEU_SERVICE_ID_AQUI',
```

**SUBSTITUA** por (exemplo):
```javascript
serviceID: 'service_abc123xyz',
```
👆 Use o SEU Service ID do Bloco de Notas!

---

```javascript
ativacaoCapitao: 'COLE_TEMPLATE_ATIVACAO_CAPITAO_AQUI',
```

**SUBSTITUA** por (exemplo):
```javascript
ativacaoCapitao: 'template_abc123',
```
👆 Use o SEU Template ID do Bloco de Notas!

---

```javascript
ativacaoCliente: 'COLE_TEMPLATE_ATIVACAO_CLIENTE_AQUI',
```

**SUBSTITUA** por (exemplo):
```javascript
ativacaoCliente: 'template_xyz456',
```
👆 Use o SEU Template ID!

---

```javascript
reservaCapitao: 'COLE_TEMPLATE_RESERVA_CAPITAO_AQUI',
```

**SUBSTITUA** por (exemplo):
```javascript
reservaCapitao: 'template_def789',
```
👆 Use o SEU Template ID!

---

```javascript
reservaCliente: 'COLE_TEMPLATE_RESERVA_CLIENTE_AQUI',
```

**SUBSTITUA** por (exemplo):
```javascript
reservaCliente: 'template_ghi012',
```
👆 Use o SEU Template ID!

---

```javascript
publicKey: 'COLE_SUA_PUBLIC_KEY_AQUI',
```

**SUBSTITUA** por (exemplo):
```javascript
publicKey: 'abc123XYZ456',
```
👆 Use a SUA Public Key!

---

### 3. Salve o ficheiro (Ctrl + S)

---

## 🚀 FAZER DEPLOY

1. **Abra o Git Bash** ou **CMD** na pasta do projeto:
```bash
cd C:\Users\servi\Desktop\algarvefishing
```

2. **Execute**:
```bash
git add .
git commit -m "✅ Configuração EmailJS completa"
git push
```

3. **Aguarde 2-3 minutos**

---

## 🧪 TESTAR

1. **Acesse**: https://algarvefishing.vercel.app/auth.html

2. **Clique em "Registar"**

3. **Preencha com SEU EMAIL REAL** (Gmail, Outlook, etc.)

4. **Clique em "Criar Conta"**

5. **Verifique seu email** (inbox ou SPAM!)

6. **Clique no link de ativação**

7. **Deve aparecer**: "Conta Ativada! ✅"

8. **Faça login** → Deve funcionar!

---

## ❌ SE DER ERRO

### Erro: "EmailJS não inicializado"
- Verifique se você SALVOU o ficheiro `js/email-config.js`
- Verifique se os IDs estão CORRETOS (sem aspas extras, sem espaços)

### Erro: "Service not found"
- O Service ID está errado
- Copie novamente do EmailJS

### Erro: "Template not found"
- Um dos Template IDs está errado
- Copie novamente do EmailJS

### Email não chega
- Verifique a pasta de SPAM
- Aguarde 2-3 minutos
- Verifique se o email que você usou está correto

---

## 🆘 PRECISA DE AJUDA?

**Me envie:**
1. Print do EmailJS (página "Email Services")
2. Print do EmailJS (página "Email Templates")
3. O conteúdo do seu Bloco de Notas com os IDs
4. Print do console do navegador (F12)

**Responderei** com instruções específicas!

---

## ✅ CHECKLIST FINAL

- [ ] Email Hostinger criado (`noreply@algarvetunacharter.pt`)
- [ ] Conta EmailJS criada
- [ ] Serviço SMTP adicionado no EmailJS
- [ ] 4 templates criados no EmailJS
- [ ] Service ID copiado
- [ ] 4 Template IDs copiados
- [ ] Public Key copiada
- [ ] Ficheiro `js/email-config.js` editado e SALVO
- [ ] Git push feito
- [ ] Teste de registo realizado
- [ ] Email recebido
- [ ] Conta ativada
- [ ] Login funcionando

---

**Boa sorte!** 🚀🎣
