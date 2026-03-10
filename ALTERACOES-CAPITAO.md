# ✅ ALTERAÇÕES FEITAS - REGISTO DE CAPITÃO

## 📋 RESUMO DAS MUDANÇAS

### **ANTES** ❌:
```
Campos Capitão:
- Nº Cédula Marítima (obrigatório)
- Livrete RNAAT (upload obrigatório)
- Certificado de Seguro (upload obrigatório)
- Anos de Experiência (obrigatório)
- Porto de Origem (obrigatório)
```

### **AGORA** ✅:
```
Campos Capitão:
- Livrete (upload obrigatório) ⭐ NOVO!
- RNAAT (upload obrigatório) ⭐ RENOMEADO!
- Certificado de Seguro (upload obrigatório)
- Anos de Experiência (obrigatório)
- Porto de Origem (obrigatório)

❌ REMOVIDO: Nº Cédula Marítima
```

---

## 📄 DOCUMENTOS OBRIGATÓRIOS (3)

### 1. **Livrete** 📋
- Upload: PDF ou Imagem
- Descrição: Livrete da embarcação
- Campo: `#uploadLivrete`
- **Required**: Sim

### 2. **RNAAT** 📋
- Upload: PDF ou Imagem
- Descrição: Registo Nacional de Aluguer de Atividades Turísticas
- Campo: `#uploadRNAAT`
- **Required**: Sim

### 3. **Certificado de Seguro** 📋
- Upload: PDF ou Imagem
- Descrição: Seguro marítimo válido
- Campo: `#uploadSeguro`
- **Required**: Sim

---

## 🔄 FICHEIROS MODIFICADOS

### 1. **auth.html**
```diff
- <label>Nº Cédula Marítima</label>
- <input type="text" placeholder="CM123456">

- <label>Livrete RNAAT (PDF/Imagem)</label>
+ <label>Livrete (PDF/Imagem)</label>
+ <input type="file" id="uploadLivrete" required>
+ <small>Livrete da embarcação</small>

+ <label>RNAAT (PDF/Imagem)</label>
+ <input type="file" id="uploadRNAAT" required>
+ <small>Registo Nacional de Aluguer de Atividades Turísticas</small>

  <label>Certificado de Seguro (PDF/Imagem)</label>
+ <input type="file" id="uploadSeguro" required>
+ <small>Seguro marítimo válido</small>
```

### 2. **GUIA-DE-TESTE.md**
```diff
Dados do Capitão:
- Número da Cédula Marítima: 123456
+ [REMOVIDO]

Upload de Documentos:
- Livrete RNAAT: ficheiro
+ Livrete: ficheiro (livrete da embarcação)
+ RNAAT: ficheiro (Registo Nacional de Aluguer de Atividades Turísticas)
  Certificado de Seguro: ficheiro
```

---

## 🎯 VALIDAÇÃO NO ADMIN

Quando o admin for aprovar o capitão, verá:

```
📋 Documentos do Capitão:

✅ Livrete
   └─ [Download] livrete_joao_silva.pdf

✅ RNAAT  
   └─ [Download] rnaat_joao_silva.pdf

✅ Certificado de Seguro
   └─ [Download] seguro_joao_silva.pdf

[Aprovar Capitão] [Rejeitar]
```

---

## 🧪 TESTAR AGORA

### Passos para Teste:
```
1. Abrir: auth.html
2. Tab: "Registar"
3. Escolher: "Capitão"
4. Preencher dados básicos
5. Verificar campos capitão:
   ✅ Anos de Experiência
   ✅ Porto de Origem
   ❌ Sem Cédula Marítima
   
6. Upload 3 documentos:
   ✅ Livrete (obrigatório)
   ✅ RNAAT (obrigatório)
   ✅ Seguro (obrigatório)
   
7. Clicar "Criar Conta"
8. Verificar mensagem: "Conta pendente de aprovação!"
9. Estado: PENDENTE (aguarda admin)
```

---

## 📝 NOTAS IMPORTANTES

### Para Desenvolvimento:
- Todos os 3 uploads são **required**
- Validação HTML5 nativa (navegador bloqueia submit se faltar)
- IDs únicos para cada campo: `uploadLivrete`, `uploadRNAAT`, `uploadSeguro`
- Descrições claras abaixo de cada campo

### Para Produção:
- Backend deve validar que os 3 ficheiros foram enviados
- Armazenar em cloud storage (AWS S3, Cloudinary, etc.)
- Gerar nomes únicos: `livrete_{capitao_id}_{timestamp}.pdf`
- Validar tipos de ficheiro (MIME type)
- Limite de tamanho: 5-10 MB por ficheiro

---

## ✅ CHECKLIST DE VALIDAÇÃO

Teste se:
- [ ] Campo "Cédula Marítima" foi **removido**
- [ ] Aparecem **3 uploads** (Livrete, RNAAT, Seguro)
- [ ] Cada upload tem descrição clara
- [ ] Todos são **required** (asterisco vermelho)
- [ ] Não consegue submeter sem os 3 ficheiros
- [ ] Após registo aparece "Conta pendente"
- [ ] Admin vê os 3 documentos no dashboard
- [ ] Admin consegue fazer download dos 3

---

## 🎯 PRÓXIMO PASSO

Depois de validar o registo de capitão, vamos para:
1. Validação dos documentos no admin
2. Registo de barco (também precisa de 3 documentos)
3. Fluxo completo de aprovação

**Testa agora e reporta se está tudo OK!** 🚀
