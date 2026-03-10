# 🧪 Guia de Teste - Saídas Partilhadas
**Teste Rápido em 5 Minutos | v1.0**

---

## 🎯 **Objetivo**
Testar o fluxo completo de **Saídas Partilhadas** desde a criação pelo capitão até a visualização pelo cliente.

---

## 📋 **Pré-requisitos**
1. ✅ Ter uma conta de **Capitão aprovado**
2. ✅ Ter pelo menos **1 barco registado e aprovado**
3. ✅ Navegador atualizado (Chrome, Firefox, Edge, Safari)

---

## 🧑‍✈️ **TESTE 1: Criar Saída Partilhada (Capitão)**

### **Passo 1: Login**
```
1. Abra: auth.html
2. Login com:
   Email: capitao.teste@algarvefishing.com
   Senha: teste12345
3. Clique "Entrar"
```

### **Passo 2: Aceder Criar Saída**
```
1. No dashboard, clique em "Criar Saída"
2. Será redirecionado para: criar-saida.html
```

### **Passo 3: Preencher Formulário**
```
📝 INFORMAÇÕES BÁSICAS:
   Título: Caça ao Atum Gigante
   Barco: [Selecione o seu barco]
   Data: 25/03/2026
   Hora: 06:00
   Duração: 12 horas
   Porto de Saída: Marina de Portimão

📝 CAPACIDADE E PREÇO:
   Nº Máximo de Pescadores: 8
   Preço por Pessoa: 250€

📝 O QUE ESTÁ INCLUÍDO:
   ✅ Equipamento de Pesca
   ✅ Isco/Engodo
   ✅ Lanches e Bebidas
   ✅ Limpeza do Peixe

📝 NÍVEL DE DIFICULDADE:
   Selecione: Avançado
```

### **Passo 4: Ativar Saída Partilhada** ⭐
```
1. Encontre a caixa azul "Permitir Saída Partilhada"
2. ✅ Marque o checkbox
3. A seção "Opções Partilhada" aparecerá (animação fade-in)

📝 PREENCHA:
   Vagas Disponíveis: 4
   Preço Total da Saída (€): 1000

💡 OBSERVE:
   O sistema mostra automaticamente:
   "Exemplo: Preço Total €1.000 ÷ 4 vagas = €250 por pessoa"
```

### **Passo 5: Salvar**
```
1. Clique "Criar Saída"
2. Toast verde aparece:
   "✅ Saída Partilhada criada! €1.000 ÷ 4 pessoas = €250/pessoa"
3. Redirecionado para: dashboard-capitao.html
```

**✅ TESTE 1 COMPLETO!**

---

## 🎣 **TESTE 2: Visualizar no Explorar (Cliente)**

### **Passo 1: Abrir Explorar**
```
1. Abra: explorar.html
2. Ou clique "Explorar Saídas" no menu
```

### **Passo 2: Identificar Saídas Partilhadas**
```
🔍 PROCURE POR:
   • Badge azul no topo da imagem: "🎣 SAÍDA PARTILHADA"
   • Card com borda mais clara (azul-ciano)
   • Bloco especial azul dentro do card
```

### **Passo 3: Verificar Informações no Card**
```
✅ DEVE MOSTRAR:
   
   ┌─────────────────────────────────────┐
   │ 🎣 SAÍDA PARTILHADA (badge azul)    │
   │                                     │
   │ 💰 Custos Partilhados               │
   │ 👥 2/4 ocupadas | 2 vagas livres    │
   │ 💵 Total: €1.000 ÷ 4 pessoas        │
   │                                     │
   │ ⭐⭐⭐⭐⭐ (42 avaliações)            │
   │ 👨‍✈️ Capitão: Carlos Marinho         │
   │ 📅 20/03/2026 às 06:00              │
   │ ⏱️  12 horas                         │
   │                                     │
   │ [  €250 / pessoa  ] (azul)          │
   │ [  Juntar-me à Saída  ] (botão)    │
   └─────────────────────────────────────┘
```

### **Passo 4: Ver Exemplos**
```
🎣 SAÍDAS PARTILHADAS DE EXEMPLO:

1️⃣ ID 4: Caça ao Atum Gigante
   • €1.000 total ÷ 4 vagas = €250/pessoa
   • 2 ocupadas, 2 livres
   
2️⃣ ID 5: Pesca de Espadarte
   • €1.800 total ÷ 6 vagas = €300/pessoa
   • 1 ocupada, 5 livres
```

**✅ TESTE 2 COMPLETO!**

---

## 📄 **TESTE 3: Ver Detalhes da Saída Partilhada**

### **Passo 1: Clicar em Saída Partilhada**
```
1. No explorar.html, clique "Juntar-me à Saída"
2. Será redirecionado para: detalhe-saida.html?id=4
```

### **Passo 2: Verificar Bloco Especial**
```
📊 DEVE APARECER NA SIDEBAR:

┌───────────────────────────────────────┐
│ 👥 Saída Partilhada                   │
├───────────────────────────────────────┤
│ 💰 Divida os custos com outros        │
│    pescadores! Junte-se e economize.  │
│                                       │
│ ┌─────────────────────────────────┐   │
│ │ Preço Total:      €1.000        │   │
│ │ Vagas Totais:     4 pessoas     │   │
│ │ ────────────────────────────────│   │
│ │ Preço por Pessoa: €250          │   │
│ └─────────────────────────────────┘   │
│                                       │
│ 👥 Vagas Ocupadas: 2 / 4              │
│ [████████░░░░░░░░] 50%                │
│                                       │
│ ⚠️  2 vagas ainda disponíveis!        │
│                                       │
│ ✅ Participantes Confirmados:         │
│                                       │
│ ┌─────────────────────────────────┐   │
│ │ 👤 MS  Marco Sousa              │   │
│ │        ✅ Confirmado             │   │
│ └─────────────────────────────────┘   │
│                                       │
│ ┌─────────────────────────────────┐   │
│ │ 👤 RP  Rita Pereira             │   │
│ │        ✅ Confirmado             │   │
│ └─────────────────────────────────┘   │
└───────────────────────────────────────┘
```

### **Passo 3: Testar com IDs Diferentes**
```
✅ TESTE COM:
   • detalhe-saida.html?id=4 → Mostra bloco partilhada
   • detalhe-saida.html?id=5 → Mostra bloco partilhada
   • detalhe-saida.html?id=1 → NÃO mostra (saída normal)
```

**✅ TESTE 3 COMPLETO!**

---

## 🔄 **TESTE 4: Fluxo de Contacto**

### **Passo 1: Solicitar Participação**
```
1. Em detalhe-saida.html?id=4
2. Clique "Contactar Capitão"
3. Modal abre com formulário
```

### **Passo 2: Preencher Formulário**
```
📝 PREENCHA:
   Nome: João Silva
   Email: joao@teste.com
   Telefone: +351 965 123 456
   Número de Pessoas: 1
   Mensagem: "Gostaria de me juntar à saída partilhada."
```

### **Passo 3: Enviar**
```
1. Clique "Enviar Mensagem"
2. Toast especial aparece:
   "🎉 Pedido enviado! O capitão entrará em contacto 
   para confirmar sua vaga na saída partilhada."
```

**✅ TESTE 4 COMPLETO!**

---

## ✅ **Checklist de Validação**

Marque ✅ após testar cada item:

### **Criação (Capitão)**
- [ ] Checkbox "Permitir Saída Partilhada" funciona
- [ ] Campos "Vagas" e "Preço Total" aparecem ao ativar
- [ ] Cálculo automático mostra "€X ÷ Y vagas = €Z/pessoa"
- [ ] Toast de sucesso exibe valores corretos
- [ ] Saída é criada e aparece no dashboard

### **Explorar (Cliente)**
- [ ] Badge azul "🎣 SAÍDA PARTILHADA" aparece
- [ ] Bloco azul com info de custos partilhados
- [ ] Vagas ocupadas/livres corretas
- [ ] Barra de progresso funciona
- [ ] Botão "Juntar-me à Saída" diferenciado

### **Detalhes (Cliente)**
- [ ] Bloco especial azul aparece na sidebar
- [ ] Cálculo de divisão correto
- [ ] Barra de progresso visual
- [ ] Lista de participantes com iniciais
- [ ] Toast especial ao enviar pedido

### **Responsividade**
- [ ] Desktop (> 1024px) → OK
- [ ] Tablet (768px - 1023px) → OK
- [ ] Mobile (< 767px) → OK

---

## 🐛 **Problemas Comuns e Soluções**

### **Problema 1: Bloco não aparece em detalhe-saida.html**
```javascript
✅ SOLUÇÃO:
1. Abra Console (F12)
2. Digite: console.log(saidaId)
3. Verifique se retorna '4' ou '5'
4. Se retornar null, adicione ?id=4 na URL
```

### **Problema 2: Saídas partilhadas não aparecem no explorar**
```javascript
✅ SOLUÇÃO:
1. Verifique js/explorar.js
2. Confirme que IDs 4 e 5 têm partilhada: true
3. Ctrl+F5 para limpar cache
4. Recarregue a página
```

### **Problema 3: Campos não aparecem ao marcar checkbox**
```javascript
✅ SOLUÇÃO:
1. Inspecione elemento (F12)
2. Procure div#opcoesPartilhada
3. Verifique se style.display está 'block'
4. Se não, verifique JavaScript no criar-saida.html
```

---

## 📸 **Capturas Esperadas**

### **1. Criar Saída - Checkbox Ativado**
```
┌───────────────────────────────────────────┐
│ ✅ Permitir Saída Partilhada              │
│                                           │
│ 💡 Permite que vários clientes se juntem │
│    à mesma saída para dividir os custos.  │
│                                           │
│ ┌─────────────────┐ ┌──────────────────┐ │
│ │ Vagas: [4    ]  │ │ Preço: [1000  ] ││
│ └─────────────────┘ └──────────────────┘ │
│                                           │
│ 💡 Exemplo: €1.000 ÷ 4 vagas = €250      │
└───────────────────────────────────────────┘
```

### **2. Explorar - Card Partilhada**
```
┌─────────────────────────────────────┐
│ [IMAGEM DO BARCO]                   │
│ [🎣 SAÍDA PARTILHADA] (badge azul)  │
├─────────────────────────────────────┤
│ 📍 Marina de Portimão               │
│ 🎣 Caça ao Atum Gigante             │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 💰 Custos Partilhados           │ │
│ │ 👥 2/4 ocupadas | 2 vagas livres│ │
│ │ 💵 Total: €1.000 ÷ 4 pessoas    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [  €250 / pessoa  ]                 │
│ [  Juntar-me à Saída  ]             │
└─────────────────────────────────────┘
```

### **3. Detalhes - Bloco Partilhada**
```
┌───────────────────────────────────────┐
│ 👥 Saída Partilhada                   │
│                                       │
│ Preço Total:      €1.000              │
│ Vagas Totais:     4 pessoas           │
│ Preço por Pessoa: €250                │
│                                       │
│ Vagas Ocupadas: 2 / 4                 │
│ [████████░░░░░░░░] 50%                │
│                                       │
│ ✅ Participantes:                     │
│ • MS - Marco Sousa                    │
│ • RP - Rita Pereira                   │
└───────────────────────────────────────┘
```

---

## ⚡ **Teste Rápido (1 Minuto)**

```bash
# 1. Criar Saída
criar-saida.html → ✅ Permitir Partilhada → Vagas: 4, Preço: 1000 → Criar

# 2. Ver no Explorar
explorar.html → Procurar badge azul → Verificar info

# 3. Ver Detalhes
Clicar saída → Verificar bloco azul na sidebar

# 4. Enviar Pedido
Contactar Capitão → Preencher → Enviar → Toast especial
```

---

## 📊 **Métricas de Sucesso**

Após os testes, o sistema deve ter:

- ✅ **100% funcionalidade** nos 4 testes principais
- ✅ **Design consistente** com tema FishingHub (azul/laranja)
- ✅ **Responsivo** em todos os dispositivos
- ✅ **Sem erros** no console do navegador
- ✅ **UX intuitiva** (fácil de usar sem instruções)

---

## 🎯 **Próximos Passos**

Após validar os testes:

1. ✅ Integrar com backend real (API)
2. ✅ Adicionar sistema de pagamentos
3. ✅ Criar dashboard de gestão de participantes
4. ✅ Implementar notificações por email
5. ✅ Adicionar chat de grupo

---

## 📞 **Suporte Técnico**

**Encontrou um bug?**  
📧 dev@fishinghub.pt  
📝 Crie um issue no repositório  
💬 Canal #bugs no Discord

---

**✅ Teste completo! Sistema de Saídas Partilhadas está operacional! 🎣**

---

**© 2026 FishingHub - Teste realizado em 08/03/2026**
