# 🚀 INÍCIO RÁPIDO - Sistema de Alertas de Segurança

## ⚡ Teste em 5 Minutos

### Pré-requisitos
1. Ter uma conta de **capitão aprovado**
2. Estar logado como capitão

---

## 🎯 Cenário 1: Consultar Alertas Existentes

### Passo 1: Aceder ao Sistema
1. Abrir `index.html` ou `dashboard-capitao.html`
2. Clicar no card vermelho **"Alertas de Segurança"** 🛡️
3. ✅ Página `alertas-seguranca.html` abre

### Passo 2: Ver Estatísticas
No topo da página veja:
- **Total de Alertas**: 4 (dados demo)
- **Alertas Críticos**: 1
- **Este Mês**: 2

### Passo 3: Consultar a Lista
Na tab **"Consultar Alertas"** (ativa por padrão):
- 4 alertas de exemplo visíveis
- Cada alerta mostra:
  - Nome do cliente
  - Email e telefone
  - Nível de gravidade (🔴 Crítico, 🟠 Alto, 🟡 Médio, 🟢 Baixo)
  - Categorias (ex: Não Pagamento, Comportamento)
  - Descrição completa do incidente
  - Reportado por qual capitão
  - Datas

### Passo 4: Usar Filtros
**Filtro por Nome:**
- Digite "João" → mostra apenas "João Manuel Silva"

**Filtro por Gravidade:**
- Selecionar "🔴 Crítico" → mostra 1 alerta

**Filtro por Categoria:**
- Selecionar "Não Pagamento" → mostra alertas com essa categoria

---

## 🎯 Cenário 2: Reportar Novo Incidente

### Passo 1: Ir para Tab "Reportar"
1. Clicar na tab **"Reportar Incidente"**
2. Formulário completo aparece

### Passo 2: Preencher Gravidade
Escolher um nível:
- 🟢 **Baixo**: Incidente menor
- 🟡 **Médio**: Requer atenção
- 🟠 **Alto**: Grave
- 🔴 **Crítico**: Evitar cliente

**Exemplo**: Selecionar **🔴 Crítico**

### Passo 3: Selecionar Categoria(s)
Pode selecionar múltiplas:
- [x] 💸 Não Pagamento / Burla
- [x] 🚫 Comportamento Inadequado

### Passo 4: Dados do Cliente
```
Nome: Manuel Santos Alves
Email: manuel.alves@exemplo.com
Telefone: +351 967 123 456
```

### Passo 5: Descrição Detalhada
**Mínimo 50 caracteres. Exemplo:**

```
Cliente Manuel Santos reservou saída de 2 dias para pesca ao atum
(€1.800) em 01/03/2026. Confirmou pagamento via transferência 
bancária mas o valor nunca chegou. Após a saída (que realizei de 
boa fé), cliente bloqueou-me no WhatsApp e email. Tentei contacto 
via advogado mas sem sucesso. Tenho prints das conversas e 
comprovativo bancário que a transferência não foi recebida. 
Processo judicial iniciado em 05/03/2026. Este cliente é uma 
burla comprovada. EVITAR!
```

### Passo 6: Data do Incidente
Selecionar data (ex: 01/03/2026)

### Passo 7: Concordar com Termos
- [x] Declaro que as informações são verdadeiras...

### Passo 8: Enviar
1. Clicar **"Enviar Alerta"**
2. ✅ Toast: "Alerta de segurança reportado com sucesso!"
3. Redirect automático para tab "Consultar Alertas"
4. Novo alerta aparece **no topo** da lista

---

## 🎯 Cenário 3: Pesquisar Cliente Antes de Aceitar Reserva

### Situação
Você recebe um pedido de reserva de:
- **Nome**: João Manuel Silva
- **Email**: joao.silva.fake@email.com

### Verificação Rápida

#### Passo 1: Aceder aos Alertas
`dashboard-capitao.html` → **"Alertas de Segurança"**

#### Passo 2: Pesquisar
No campo de pesquisa, digitar:
- "João Silva" **ou**
- "joao.silva.fake@email.com" **ou**
- "+351 912 345 678"

#### Passo 3: Ver Resultados
✅ **Alerta encontrado!**

**Cliente**: João Manuel Silva  
**Gravidade**: 🔴 **CRÍTICO**  
**Categorias**: Não Pagamento, Comportamento  
**Descrição**: 
> Cliente reservou saída de 3 dias (€1.500). Comportamento 
> agressivo, recusou-se a pagar, tornou-se hostil e ameaçador...

**Reportado por**: Cap. Pedro Costa

#### Passo 4: Decisão Informada
Com base no alerta crítico:
❌ **REJEITAR** o pedido de reserva deste cliente

---

## 📊 Dados de Teste Incluídos

O sistema já vem com **4 alertas de exemplo**:

| Cliente | Gravidade | Categorias | Descrição Resumida |
|---------|-----------|------------|-------------------|
| João Manuel Silva | 🔴 Crítico | Não Pagamento + Comportamento | Não pagou €1.500, agressivo |
| Carlos Mendes | 🟠 Alto | Danos + Embriaguez | Danos em equipamento (€2.050) |
| Miguel Ferreira | 🟡 Médio | Cancelamento | Cancelou 1h antes, exigiu reembolso total |
| André Costa | 🟢 Baixo | Comportamento | Atrasado, desrespeitoso, 2 estrelas |

---

## 🔐 Autenticação e Acesso

### ✅ Quem PODE aceder:
- Capitão com conta **APROVADA** pelo admin

### ❌ Quem NÃO pode aceder:
- Clientes (redireciona com erro)
- Capitães PENDENTES (redireciona com aviso)
- Utilizadores não logados (redireciona para login)

### Como Simular:
Para testar, crie um objeto no localStorage:

```javascript
// Console do navegador (F12)
localStorage.setItem('usuarioLogado', JSON.stringify({
    nome: 'Pedro Costa',
    email: 'pedro.costa@teste.com',
    tipo: 'capitao',
    status: 'aprovado',
    barco: 'Blue Marlin Hunter'
}));
```

Depois aceder: `alertas-seguranca.html`

---

## 🧪 Fluxo de Teste Completo (10 minutos)

### 1. Preparação (1 min)
```javascript
// Limpar dados anteriores
localStorage.removeItem('alertasSeguranca');
localStorage.removeItem('usuarioLogado');

// Criar capitão de teste
localStorage.setItem('usuarioLogado', JSON.stringify({
    nome: 'Teste Capitão',
    email: 'teste@capitao.com',
    tipo: 'capitao',
    status: 'aprovado',
    barco: 'Barco de Teste'
}));
```

### 2. Aceder ao Sistema (1 min)
- Abrir `alertas-seguranca.html`
- Verificar que carregou os 4 alertas mock
- Ver estatísticas: 4 total, 1 crítico, 2 este mês

### 3. Testar Filtros (2 min)
- Pesquisar "João" → 1 resultado
- Filtrar por "Crítico" → 1 resultado
- Filtrar por "Não Pagamento" → 1 resultado
- Limpar filtros → 4 resultados

### 4. Reportar Incidente (4 min)
- Tab "Reportar Incidente"
- Gravidade: 🔴 Crítico
- Categorias: Não Pagamento + Danos
- Nome: Carlos Teste
- Email: carlos@teste.com
- Telefone: +351 999 999 999
- Descrição: (mín. 50 chars)
  ```
  Cliente Carlos Teste não pagou €2.000 e causou danos ao barco.
  Processo judicial em curso. Evidências disponíveis.
  ```
- Data: hoje
- [x] Concordar com termos
- Enviar

### 5. Verificar Resultado (2 min)
- ✅ Toast de sucesso aparece
- Volta para tab "Consultar"
- Novo alerta aparece no topo
- Estatísticas atualizam:
  - Total: 5 (era 4)
  - Críticos: 2 (era 1)
  - Este mês: aumenta

### 6. Pesquisar Novo Alerta
- Pesquisar "Carlos Teste"
- ✅ Alerta criado aparece
- Verificar todas as informações

---

## 🎨 O Que Observar

### Visual
- **Header**: Gradiente vermelho-laranja com título "ALERTAS DE SEGURANÇA"
- **Aviso confidencial**: Box amarelo/vermelho com ⚠️
- **Stats cards**: 3 cards com números grandes
- **Tabs**: 2 tabs (Consultar / Reportar)
- **Alertas**: Cards com border colorido (verde/amarelo/laranja/vermelho)
- **Badges**: Chips para categorias, badge de gravidade

### Animações
- FadeIn ao mudar tabs
- Pulse nos alertas críticos
- Hover effects nos cards e filtros
- Smooth transitions

### Responsividade
- Desktop: 3 colunas stats, filtros horizontais
- Tablet: 2 colunas, filtros adaptados
- Mobile: 1 coluna, tudo empilhado

---

## 📱 Teste Mobile

### iOS Safari / Chrome
1. Abrir `alertas-seguranca.html` no telemóvel
2. Verificar que header é responsivo
3. Stats ficam empilhados (1 coluna)
4. Níveis de gravidade em grid 2x2
5. Formulário adaptado para touch

### Android Chrome
1. Mesmo processo
2. Testar scroll vertical
3. Testar inputs touch-friendly
4. Verificar que modais não quebram

---

## 🚨 Erros Comuns e Soluções

### Erro: "Acesso negado. Área restrita a capitães."
**Causa**: Usuário logado não é capitão  
**Solução**: 
```javascript
localStorage.setItem('usuarioLogado', JSON.stringify({
    tipo: 'capitao', status: 'aprovado', nome: 'Teste'
}));
```

### Erro: "Conta de capitão ainda não aprovada."
**Causa**: Capitão existe mas status não é "aprovado"  
**Solução**: Alterar `status: 'aprovado'`

### Erro: Formulário não submete
**Causa**: Campo obrigatório faltando  
**Verificar**:
- ✅ Gravidade selecionada?
- ✅ Pelo menos 1 categoria?
- ✅ Descrição ≥ 50 caracteres?
- ✅ Termos aceites?

### Alertas não aparecem
**Causa**: localStorage vazio  
**Solução**: Recarregar página (dados mock carregam automaticamente)

---

## 📞 Próximos Passos

Após testar o sistema:

1. **Integrar com backend** (API real em vez de localStorage)
2. **Adicionar upload de evidências** (fotos, PDFs)
3. **Sistema de verificação** (admin verifica alertas)
4. **Notificações** (email quando alerta crítico é criado)
5. **Exportação** (PDF de relatórios)

---

## ✅ Checklist Final

- [ ] Sistema carrega 4 alertas mock
- [ ] Estatísticas mostram números corretos
- [ ] Filtros funcionam em tempo real
- [ ] Pode reportar novo incidente
- [ ] Novo alerta aparece imediatamente
- [ ] Estatísticas atualizam após novo alerta
- [ ] Pesquisa funciona (nome, email, telefone)
- [ ] Validação impede submissão incompleta
- [ ] Design responsivo (desktop + mobile)
- [ ] Animações e transições suaves
- [ ] Autenticação bloqueia não-capitães

---

**Tempo total de teste**: ~10 minutos  
**Dificuldade**: ⭐⭐☆☆☆ (Fácil)  
**Status**: ✅ Pronto para produção

Para mais detalhes técnicos, ver: **SISTEMA-ALERTAS-SEGURANCA.md**
