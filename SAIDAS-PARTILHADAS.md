# 🎣 Sistema de Saídas Partilhadas - FishingHub
**Versão 1.0 | Data: 08/03/2026**

---

## 📋 **Índice**
1. [O Que São Saídas Partilhadas?](#o-que-são-saídas-partilhadas)
2. [Vantagens do Sistema](#vantagens-do-sistema)
3. [Fluxo Completo](#fluxo-completo)
4. [Para Capitães: Como Criar](#para-capitães-como-criar)
5. [Para Clientes: Como Participar](#para-clientes-como-participar)
6. [Gestão de Participantes](#gestão-de-participantes)
7. [Modelo de Dados](#modelo-de-dados)
8. [Exemplos Práticos](#exemplos-práticos)
9. [FAQ](#faq)

---

## 🌊 **O Que São Saídas Partilhadas?**

As **Saídas Partilhadas** são uma funcionalidade revolucionária que permite que vários clientes se juntem à mesma saída de pesca para **dividir os custos**, tornando a experiência mais acessível e promovendo a formação de grupos.

### **Conceito:**
- O capitão cria uma saída e **define o preço total** (ex: €1.000)
- Define **quantas vagas** estão disponíveis (ex: 4 pessoas)
- Os clientes podem **reservar individualmente** e pagar apenas a sua parte
- O custo é **automaticamente dividido** entre todos os participantes

### **Exemplo Real:**
```
🎣 Caça ao Atum Gigante - PARTILHADA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 Preço Total: €1.000
👥 Vagas: 4 pessoas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 Preço por Pessoa: €250
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Situação Atual:
✅ 2 vagas ocupadas (Marco Sousa, Rita Pereira)
🟢 2 vagas livres
```

---

## ✅ **Vantagens do Sistema**

### **Para Clientes:**
- 💰 **Economia:** Custos reduzidos ao dividir com outros pescadores
- 👥 **Socialização:** Conhecer outros entusiastas da pesca
- 🎣 **Acesso a experiências premium:** Saídas de alto custo tornam-se acessíveis
- ⚡ **Flexibilidade:** Participar sem precisar formar um grupo completo
- 🛡️ **Segurança:** Ver quantas pessoas já confirmaram participação

### **Para Capitães:**
- 📈 **Maximização de Ocupação:** Garantir barco cheio mesmo sem grupos grandes
- 💼 **Gestão Simplificada:** Sistema automatiza divisão de custos
- 🎯 **Público Mais Amplo:** Atrair clientes que não podem pagar o valor total
- 🌟 **Experiência de Grupo:** Criar dinâmica positiva entre participantes
- 📊 **Previsibilidade:** Visualizar ocupação em tempo real

### **Para a Plataforma:**
- 🚀 **Diferencial Competitivo:** Funcionalidade única no mercado
- 📱 **Maior Engajamento:** Clientes retornam para encontrar grupos
- 💬 **Comunidade:** Fomentar interações entre utilizadores
- 📈 **Conversão:** Reduzir abandono por preço elevado

---

## 🔄 **Fluxo Completo**

### **1️⃣ Capitão Cria Saída Partilhada**
```
Dashboard Capitão → Criar Nova Saída
  ↓
Preenche informações básicas (título, data, duração, etc.)
  ↓
Marca checkbox "Permitir Saída Partilhada" ✅
  ↓
Define:
  • Vagas Disponíveis: 4 pessoas
  • Preço Total: €1.000
  ↓
Sistema calcula: €1.000 ÷ 4 = €250/pessoa
  ↓
Saída criada com status "Partilhada"
```

### **2️⃣ Cliente Descobre a Saída**
```
explorar.html
  ↓
🎣 Vê badge azul "SAÍDA PARTILHADA"
  ↓
Card mostra:
  • Preço por pessoa: €250
  • Vagas ocupadas: 2/4
  • Vagas livres: 2
  ↓
Clica "Juntar-me à Saída"
```

### **3️⃣ Cliente Visualiza Detalhes**
```
detalhe-saida.html?id=4
  ↓
Bloco especial "Saída Partilhada" mostra:
  • Cálculo de divisão
  • Barra de progresso de ocupação
  • Lista de participantes confirmados
  ↓
Cliente envia pedido de participação
```

### **4️⃣ Capitão Aprova Participante**
```
Dashboard Capitão → Saídas Partilhadas
  ↓
Ve lista de pedidos pendentes
  ↓
Aprova novo participante
  ↓
Sistema atualiza:
  • Vagas ocupadas: 2 → 3
  • Vagas livres: 2 → 1
  • Notifica cliente por email
```

### **5️⃣ Saída Completa**
```
Todas as 4 vagas preenchidas
  ↓
Status: "Completa - Aguardando Pagamento"
  ↓
Capitão coordena com todos os participantes
  ↓
Saída realizada com sucesso! 🎉
```

---

## 👨‍✈️ **Para Capitães: Como Criar**

### **Passo a Passo:**

1. **Aceda ao Dashboard**
   - Login em `auth.html`
   - Navegue até `dashboard-capitao.html`

2. **Clique em "Criar Nova Saída"**
   - Será redirecionado para `criar-saida.html`

3. **Preencha Informações Básicas**
   - Título (ex: "Caça ao Atum Gigante")
   - Barco, Data, Hora, Duração
   - Porto de Saída
   - Tipo de Pesca, Nível de Dificuldade

4. **Ative "Permitir Saída Partilhada"** ✅
   ```
   Uma caixa azul aparecerá com:
   
   ✅ Permitir Saída Partilhada
   💡 Permite que vários clientes se juntem à mesma saída
      para dividir os custos. Perfeito para grupos!
   ```

5. **Defina Parâmetros**
   - **Vagas Disponíveis:** Quantas pessoas podem participar (2-20)
   - **Preço Total:** Valor total da saída (ex: €1.000)
   - Sistema mostra cálculo automático: "€1.000 ÷ 4 pessoas = €250/pessoa"

6. **Salvar e Publicar**
   - Clique "Criar Saída"
   - Toast de sucesso: "✅ Saída Partilhada criada! €1.000 ÷ 4 pessoas = €250/pessoa"
   - Saída aparece em `explorar.html` com badge especial

### **Boas Práticas:**

✅ **Defina vagas realistas** baseadas na lotação do barco  
✅ **Preço total deve cobrir** todos os custos (combustível, manutenção, tempo)  
✅ **Descreva claramente** o que está incluído no preço  
✅ **Comunique-se com participantes** antes da saída  
✅ **Estabeleça regras** de convivência no grupo

❌ **Evite vagas excessivas** que reduzam a experiência  
❌ **Não altere preços** após primeiras reservas  
❌ **Não cancele** sem motivo grave

---

## 🎣 **Para Clientes: Como Participar**

### **Passo a Passo:**

1. **Navegue até Explorar**
   - Aceda `explorar.html`
   - Aplique filtros (localização, tipo de pesca, preço)

2. **Identifique Saídas Partilhadas**
   - Procure pelo badge azul: **🎣 SAÍDA PARTILHADA**
   - Cards têm design diferenciado (borda azul)
   - Veja informações:
     ```
     💰 Custos Partilhados
     👥 2/4 ocupadas | 2 vagas livres
     💵 Total: €1.000 ÷ 4 pessoas
     ```

3. **Clique "Juntar-me à Saída"**
   - Será redirecionado para `detalhe-saida.html?id=X`

4. **Visualize Detalhes da Partilha**
   - Bloco especial mostra:
     - Cálculo de divisão
     - Vagas ocupadas vs. disponíveis
     - Barra de progresso
     - Lista de participantes confirmados (nomes e iniciais)

5. **Envie Pedido de Participação**
   - Clique "Contactar Capitão"
   - Preencha formulário:
     ```
     Nome: ___________
     Email: ___________
     Telefone: ___________
     Número de Pessoas: [1]
     Mensagem: "Gostaria de me juntar à saída partilhada..."
     ```

6. **Aguarde Aprovação**
   - Capitão receberá notificação
   - Você receberá email de confirmação
   - Status: "Aguardando Confirmação"

7. **Confirmação e Pagamento**
   - Após aprovação: status "Confirmado"
   - Capitão entra em contacto para coordenar pagamento
   - Recebe detalhes finais (ponto de encontro, horário exato)

### **Dicas para Clientes:**

💡 **Reserve cedo:** Vagas em saídas partilhadas esgotam rápido  
💡 **Seja flexível:** Horários podem ajustar-se ao grupo  
💡 **Comunique-se:** Contacte o capitão com dúvidas  
💡 **Respeite o grupo:** Chegue no horário, siga as regras  
💡 **Deixe avaliação:** Ajude futuros pescadores

---

## 📊 **Gestão de Participantes**

### **Dashboard do Capitão**

O dashboard exibe seção especial para saídas partilhadas:

```
╔══════════════════════════════════════════════════╗
║  🎣 SAÍDAS PARTILHADAS ATIVAS                    ║
╠══════════════════════════════════════════════════╣
║                                                   ║
║  📅 Caça ao Atum Gigante                         ║
║  🗓️  20/03/2026 às 06:00                         ║
║  👥 2/4 vagas ocupadas (50%)                     ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║  [████████░░░░░░░░] 50%                          ║
║                                                   ║
║  ✅ Participantes Confirmados:                   ║
║     • Marco Sousa (+351 912 345 678)             ║
║     • Rita Pereira (+351 934 567 890)            ║
║                                                   ║
║  ⏳ Pedidos Pendentes (1):                       ║
║     • João Silva (+351 965 111 222)              ║
║       [Aprovar] [Rejeitar]                       ║
║                                                   ║
║  💰 Receita Projetada: €500 (2×€250)             ║
║  📍 Potencial Total: €1.000 (4×€250)             ║
║                                                   ║
║  [📱 Contactar Grupo] [✏️ Editar] [❌ Cancelar]  ║
║                                                   ║
╚══════════════════════════════════════════════════╝
```

### **Ações Disponíveis:**

- ✅ **Aprovar Pedido:** Confirma participação de novo cliente
- ❌ **Rejeitar Pedido:** Recusa participação (com justificativa)
- 📱 **Contactar Grupo:** Envia mensagem para todos os participantes
- ✏️ **Editar Detalhes:** Ajusta horário, ponto de encontro (notifica todos)
- 🚫 **Cancelar Saída:** Cancela com notificação automática

---

## 💾 **Modelo de Dados**

### **Estrutura de Saída Partilhada:**

```javascript
{
  id: 4,
  titulo: '🎣 Caça ao Atum Gigante - PARTILHADA',
  barco: 'Wicked Tuna',
  capitao: 'Carlos Marinho',
  capitaoId: 'cap_12345',
  
  // Informações Básicas
  localizacao: 'Marina de Portimão',
  data: '2026-03-20',
  hora: '06:00',
  duracao: 12,
  
  // PARTILHADA: true/false
  partilhada: true,
  
  // Preços (quando partilhada)
  precoTotal: 1000,           // Preço total da saída
  vagasDisponiveis: 4,        // Total de vagas
  precoPorPessoa: 250,        // precoTotal / vagasDisponiveis
  
  // Ocupação
  vagasOcupadas: 2,           // Quantas já foram preenchidas
  vagas: 2,                   // Vagas ainda livres (vagasDisponiveis - vagasOcupadas)
  
  // Participantes
  participantes: [
    {
      id: 'part_001',
      nome: 'Marco Sousa',
      email: 'marco@email.com',
      telefone: '+351 912 345 678',
      dataReserva: '2026-03-05',
      status: 'confirmado',     // pendente | confirmado | pago | cancelado
      pagamento: {
        valor: 250,
        metodo: 'transferencia',
        dataPagamento: '2026-03-06',
        comprovante: 'comprovante_001.pdf'
      }
    },
    {
      id: 'part_002',
      nome: 'Rita Pereira',
      email: 'rita@email.com',
      telefone: '+351 934 567 890',
      dataReserva: '2026-03-08',
      status: 'confirmado',
      pagamento: {
        valor: 250,
        metodo: 'mbway',
        dataPagamento: '2026-03-09',
        referencia: 'MB12345'
      }
    }
  ],
  
  // Pedidos Pendentes
  pedidosPendentes: [
    {
      id: 'ped_001',
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '+351 965 111 222',
      mensagem: 'Gostaria de me juntar à saída...',
      dataPedido: '2026-03-10',
      status: 'pendente'
    }
  ],
  
  // Metadados
  dataCriacao: '2026-03-01',
  ultimaAtualizacao: '2026-03-10',
  status: 'ativa',              // ativa | completa | realizada | cancelada
  
  // Extras
  tipos: ['Pesca de Atum', 'Big Game'],
  nivel: 'Avançado',
  extras: ['Equipamento', 'Isco', 'Lanches'],
  rating: 4.8,
  avaliacoes: 42
}
```

### **Estados Possíveis:**

| Status | Descrição | Ações Permitidas |
|--------|-----------|------------------|
| `ativa` | Saída criada, aceitando participantes | Aprovar/Rejeitar pedidos, Editar |
| `completa` | Todas as vagas preenchidas | Confirmar pagamentos, Contactar grupo |
| `realizada` | Saída concluída | Avaliar, Fechar faturamento |
| `cancelada` | Saída cancelada pelo capitão | Reembolsos, Notificações |

---

## 🎯 **Exemplos Práticos**

### **Exemplo 1: Pesca de Atum (Saída Cara)**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎣 Caça ao Atum Gigante - PARTILHADA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Marina de Portimão
📅 20/03/2026 às 06:00
⏱️  12 horas (alto mar)
🚤 Barco: Wicked Tuna
👨‍✈️ Capitão: Carlos Marinho ⭐ 4.8

💰 CUSTOS:
   Total: €1.000
   Vagas: 4 pessoas
   ━━━━━━━━━━━━━━━━━
   Por Pessoa: €250

👥 OCUPAÇÃO:
   [████████░░░░] 50%
   ✅ 2 confirmados
   🟢 2 vagas livres

📦 INCLUÍDO:
   ✅ Equipamento profissional
   ✅ Isco para atum
   ✅ Lanches e bebidas
   ✅ Limpeza do peixe
   ✅ Fotos e vídeos

🎯 PERFIL:
   Nível: Avançado
   Tipos: Big Game, Pesca de Atum
   
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[🚀 JUNTAR-ME À SAÍDA]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Resultado:**
- Cliente paga apenas €250 em vez de €1.000
- Acesso a experiência premium
- Conhece outros entusiastas
- Capitão garante ocupação máxima

---

### **Exemplo 2: Pesca de Espadarte (Super Premium)**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎣 Pesca de Espadarte - PARTILHADA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Porto de Sagres
📅 25/03/2026 às 05:30
⏱️  10 horas
🚤 Barco: Oceano Profundo
👨‍✈️ Capitão: André Santos ⭐ 5.0

💰 CUSTOS:
   Total: €1.800
   Vagas: 6 pessoas
   ━━━━━━━━━━━━━━━━━
   Por Pessoa: €300

👥 OCUPAÇÃO:
   [████░░░░░░░░] 17%
   ✅ 1 confirmado
   🟢 5 vagas livres

📦 INCLUÍDO:
   ✅ Equipamento topo de gama
   ✅ Isco especializado
   ✅ Refeições gourmet
   ✅ Bebidas premium
   ✅ Seguro de pesca
   ✅ Limpeza e embalamento
   ✅ Fotógrafo profissional

🎯 PERFIL:
   Nível: Avançado
   Tipos: Big Game, Pesca de Espadarte
   Certificação IGFA

⚠️ REQUISITOS:
   • Experiência mínima em pesca
   • Boa condição física
   • Idade mínima: 16 anos
   
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[🚀 JUNTAR-ME À SAÍDA]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Resultado:**
- Saída de €1.800 torna-se acessível por €300
- Experiência VIP partilhada
- Maior probabilidade de ocupação completa
- ROI positivo para o capitão

---

## ❓ **FAQ (Perguntas Frequentes)**

### **Para Clientes:**

**Q: Posso reservar mais de 1 vaga para mim e um amigo?**  
A: Sim! Ao enviar o pedido, especifique "Número de Pessoas: 2". Você pagará 2×€250 = €500.

**Q: E se a saída não preencher todas as vagas?**  
A: O capitão pode decidir:
- Realizar mesmo assim (mínimo de participantes)
- Reagendar
- Cancelar (com reembolso total)

**Q: Posso cancelar minha participação?**  
A: Sim, mas depende da política do capitão:
- Até 7 dias antes: reembolso 100%
- 3-7 dias antes: reembolso 50%
- Menos de 3 dias: sem reembolso

**Q: Vou conhecer os outros participantes antes?**  
A: O capitão pode criar um grupo de WhatsApp para todos se apresentarem antes da saída.

**Q: O que acontece se alguém não aparecer?**  
A: O participante perde o pagamento e a vaga pode ser oferecida a alguém na lista de espera.

---

### **Para Capitães:**

**Q: Posso definir um mínimo de participantes?**  
A: Sim, configure "Mínimo: 2 pessoas". Se não atingir, a saída é automaticamente cancelada.

**Q: Como gerencio os pagamentos?**  
A: Atualmente, pagamentos são diretos (transferência, MBWay, dinheiro). O dashboard mostra status de cada participante.

**Q: Posso adicionar participantes manualmente?**  
A: Sim, no dashboard vá em "Adicionar Participante Direto" e insira os dados.

**Q: E se precisar cancelar?**  
A: Acesse "Gerenciar Saída" → "Cancelar Saída". O sistema notifica todos os participantes automaticamente.

**Q: Posso alterar o preço após criar a saída?**  
A: Apenas se nenhum participante tiver confirmado. Caso contrário, crie uma nova saída.

---

## 🚀 **Roadmap Futuro**

### **Versão 2.0 (Planejado):**
- ✨ **Pagamentos Online:** Integração com Stripe/MBWay
- 💬 **Chat de Grupo:** Comunicação entre participantes
- 📸 **Galeria Compartilhada:** Fotos da saída acessíveis ao grupo
- 🎁 **Promoções de Grupo:** Descontos para quem completar vagas rapidamente
- 🔔 **Notificações Push:** Alertas de novas vagas disponíveis
- 📊 **Analytics:** Estatísticas de saídas partilhadas
- 🌍 **Grupos Temáticos:** "Mulheres Pescadoras", "Iniciantes", etc.
- ⭐ **Sistema de Badges:** Recompensas para participantes frequentes

---

## 📞 **Suporte**

**Dúvidas sobre Saídas Partilhadas?**  
📧 Email: suporte@fishinghub.pt  
📱 WhatsApp: +351 900 000 000  
🌐 Website: fishinghub.pt/ajuda

---

## 📝 **Changelog**

### **v1.0 (08/03/2026)**
- ✅ Sistema de saídas partilhadas implementado
- ✅ Interface de criação para capitães
- ✅ Badges e cards especiais em explorar.html
- ✅ Página de detalhes com info de participantes
- ✅ Documentação completa

---

**© 2026 FishingHub - Conectando Pescadores no Algarve 🎣**
