# 📅 Sistema de Revalidação Anual de Capitães

## 🎯 **OBJETIVO**

Garantir que **todos os capitães charter** renovem seus documentos **a cada 365 dias** para manter a certificação válida.

---

## 🔄 **FLUXO COMPLETO**

### **1️⃣ Aprovação Inicial (Admin)**
Quando o admin aprova um capitão:
- ✅ Status muda para `"aprovado"`
- 📅 Define `dataAprovacao` (data atual)
- 📆 Define `dataExpiracao` (data atual + 365 dias)
- 🟢 Define `certificacaoValida: true`

```javascript
utilizadores[index].status = 'aprovado';
utilizadores[index].dataAprovacao = dataAprovacao.toISOString();
utilizadores[index].dataExpiracao = dataExpiracao.toISOString();
utilizadores[index].certificacaoValida = true;
```

---

### **2️⃣ Verificação Automática**
A cada carregamento do admin dashboard:
- 🔍 Verifica TODOS os capitães aprovados
- 📊 Calcula dias restantes: `diasRestantes = (dataExpiracao - hoje) / (1000*60*60*24)`
- 🏷️ Define `statusDocumentacao`:
  - `"valido"` → mais de 30 dias
  - `"expira_breve"` → entre 1 e 30 dias
  - `"expirado"` → 0 ou negativo

```javascript
function verificarExpiracaoCapitoes() {
    utilizadores.forEach((user, index) => {
        if (user.tipo === 'capitao' && user.status === 'aprovado' && user.dataExpiracao) {
            const diasRestantes = Math.ceil((new Date(user.dataExpiracao) - new Date()) / (1000*60*60*24));
            
            if (diasRestantes <= 0) {
                utilizadores[index].status = 'bloqueado';
                utilizadores[index].certificacaoValida = false;
                utilizadores[index].statusDocumentacao = 'expirado';
            } else if (diasRestantes <= 30) {
                utilizadores[index].statusDocumentacao = 'expira_breve';
            } else {
                utilizadores[index].statusDocumentacao = 'valido';
            }
        }
    });
}
```

---

### **3️⃣ Bloqueio Automático**
Quando `diasRestantes <= 0`:
- 🔴 Status muda para `"bloqueado"`
- 🚫 Define `dataBloqueio` (data atual)
- 📝 Define `motivoBloqueio: "Certificação expirada - Documentos devem ser renovados"`
- 🔒 Capitão **NÃO CONSEGUE** fazer login

---

### **4️⃣ Alertas Visuais (Admin)**

#### **Capitães Aprovados (Seção Admin)**

| Dias Restantes | Badge | Cor | Ações Disponíveis |
|----------------|-------|-----|-------------------|
| > 30 dias | ✅ Válido (365 dias) | Verde (#10B981) | Ver Perfil |
| 1 a 30 dias | ⚠️ Expira em X dias | Laranja (#F59E0B) | Ver Perfil + **Solicitar Renovação** |
| ≤ 0 dias | 🔴 EXPIRADO | Vermelho (#EF4444) | (Bloqueado automaticamente) |

**Exemplo visual:**

```
┌────────────────────────────────────────┐
│ ✅ Manuel Fernandes     [✅ Válido (328 dias)] │
│ 📧 manuel@email.com                    │
│ 📅 Aprovado: 08/03/2026                │
│ ✅ Certificação válida por 328 dias    │
│ [Ver Perfil]                           │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ⚠️ João Silva     [⚠️ Expira em 15 dias] │
│ 📧 joao@email.com                      │
│ 📅 Aprovado: 23/02/2025                │
│ ⚠️ Expira em 15 dias                   │
│ [Ver Perfil] [Solicitar Renovação]     │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ 🔴 Pedro Costa     [🔴 EXPIRADO]        │
│ 📧 pedro@email.com                     │
│ 📅 Aprovado: 08/03/2025                │
│ 🔴 EXPIRADO - Renovação obrigatória    │
│ (Bloqueado automaticamente)            │
└────────────────────────────────────────┘
```

---

### **5️⃣ Alertas no Dashboard do Capitão**

#### **Certificação Válida (> 30 dias)**
✅ Nenhum alerta é exibido

#### **Próximo de Expirar (1-30 dias)**
```
╔════════════════════════════════════════════════╗
║ ⚠️ CERTIFICAÇÃO PRÓXIMA DE EXPIRAR            ║
║                                                ║
║ A sua certificação expira em 15 dias!         ║
║ Prepare os documentos para renovação:         ║
║ • Livrete do barco                            ║
║ • Certificado RNAAT                           ║
║ • Apólice de seguro                           ║
║                                                ║
║ [Iniciar Renovação]                           ║
╚════════════════════════════════════════════════╝
```

#### **EXPIRADO (≤ 0 dias)**
```
╔════════════════════════════════════════════════╗
║ 🔴 CERTIFICAÇÃO EXPIRADA!                      ║
║                                                ║
║ A sua certificação expirou há 5 dias.         ║
║ Não pode criar saídas até renovar.            ║
║                                                ║
║ Documentos necessários:                       ║
║ • Livrete do barco atualizado                 ║
║ • Certificado RNAAT válido                    ║
║ • Apólice de seguro em vigor                  ║
║                                                ║
║ [Contactar Administração]                     ║
╚════════════════════════════════════════════════╝
```

---

### **6️⃣ Solicitar Renovação (Admin)**

Quando admin clica em **"Solicitar Renovação"**:
1. ✅ Confirmação: "Deseja enviar email solicitando renovação?"
2. 📧 Email automático enviado ao capitão
3. 📋 Email contém:
   - 📅 Dias restantes ou aviso de expiração
   - 📄 Lista de documentos necessários
   - ⏰ Prazo de 7 dias úteis
   - 📧 Contato para suporte

**Email enviado:**
```
Assunto: ⚠️ Renovação de Certificação Necessária

Olá [Nome do Capitão],

A sua certificação expira em [X] dias.

DOCUMENTOS NECESSÁRIOS:
• Livrete do barco atualizado
• Certificado RNAAT válido
• Apólice de seguro em vigor

COMO RENOVAR:
1. Acesse: https://fishinghub-algarve.vercel.app/auth.html
2. Contacte: suporte@algarvefishing.com
3. Envie documentos atualizados

Prazo: 7 dias úteis

---
Equipa Algarve Tuna Charter
```

---

## 📊 **CAMPOS ADICIONADOS AO CAPITÃO**

```javascript
{
  "id": "CAP123",
  "nome": "Manuel Fernandes",
  "email": "manuel@email.com",
  "tipo": "capitao",
  "status": "aprovado", // ou "bloqueado" se expirou
  
  // ✅ NOVOS CAMPOS DO SISTEMA DE RENOVAÇÃO
  "dataAprovacao": "2026-03-08T14:30:00.000Z",
  "dataExpiracao": "2027-03-08T14:30:00.000Z", // +365 dias
  "diasRestantes": 328, // calculado automaticamente
  "certificacaoValida": true, // false se expirou
  "statusDocumentacao": "valido", // "valido" | "expira_breve" | "expirado"
  
  // Se bloqueado automaticamente:
  "dataBloqueio": "2027-03-09T10:00:00.000Z",
  "motivoBloqueio": "Certificação expirada - Documentos devem ser renovados"
}
```

---

## 🔐 **BLOQUEIO DE LOGIN**

No arquivo `auth.html`, capitães bloqueados não conseguem logar:

```javascript
if (usuario.status === 'bloqueado') {
    mostrarToast('❌ Conta bloqueada', 'erro');
    alert(`Sua conta foi bloqueada.\n\nMotivo: ${usuario.motivoBloqueio || 'Entre em contato com a administração'}`);
    return;
}
```

---

## 🧪 **COMO TESTAR**

### **Teste 1: Aprovar Capitão**
1. Login admin: https://fishinghub-algarve.vercel.app/admin-login.html
2. Ir em "Capitães Pendentes"
3. Aprovar um capitão
4. ✅ Verificar campos: `dataAprovacao`, `dataExpiracao`, `certificacaoValida: true`

### **Teste 2: Simular Expiração (MODO DEBUG)**
No console do navegador:

```javascript
// SIMULAR EXPIRAÇÃO
const users = JSON.parse(localStorage.getItem('utilizadores') || '[]');
const capitao = users.find(u => u.tipo === 'capitao' && u.email === 'manuel@email.com');

if (capitao) {
  // Simular 15 dias para expirar
  const hoje = new Date();
  capitao.dataExpiracao = new Date(hoje.getTime() + (15 * 24 * 60 * 60 * 1000)).toISOString();
  
  localStorage.setItem('utilizadores', JSON.stringify(users));
  console.log('✅ Expiração simulada para 15 dias');
  location.reload();
}
```

### **Teste 3: Bloquear Automaticamente**
```javascript
// SIMULAR EXPIRADO (-5 dias)
const users = JSON.parse(localStorage.getItem('utilizadores') || '[]');
const capitao = users.find(u => u.tipo === 'capitao' && u.email === 'manuel@email.com');

if (capitao) {
  const hoje = new Date();
  capitao.dataExpiracao = new Date(hoje.getTime() - (5 * 24 * 60 * 60 * 1000)).toISOString();
  
  localStorage.setItem('utilizadores', JSON.stringify(users));
  console.log('✅ Certificação expirada há 5 dias');
  location.reload(); // Vai bloquear automaticamente
}
```

---

## 📁 **ARQUIVOS MODIFICADOS**

| Arquivo | Alterações |
|---------|-----------|
| `admin-dashboard.html` | ✅ `verificarExpiracaoCapitoes()` <br> ✅ `carregarCapitaesAprovados()` <br> ✅ `solicitarRenovacao()` <br> ✅ Badges coloridos (válido/aviso/erro) |
| `dashboard-capitao.html` | ✅ Alerta de expiração (laranja 30 dias) <br> ✅ Alerta crítico (vermelho EXPIRADO) <br> ✅ Bloqueio de funcionalidades |
| `auth.html` | ✅ Bloqueio de login se `status === 'bloqueado'` |

---

## 🚀 **PRÓXIMOS PASSOS (Opcional)**

1. **Email real via Web3Forms** → Enviar emails reais de renovação
2. **Página de renovação dedicada** → `renovar-documentos.html` com upload
3. **Histórico de renovações** → Guardar todas as renovações anteriores
4. **Notificações automáticas** → Emails aos 60, 30 e 7 dias
5. **Relatório de expiração** → Dashboard admin com gráfico de capitães próximos de expirar

---

## ✅ **STATUS ATUAL**

| Funcionalidade | Status |
|----------------|--------|
| Aprovação com data de expiração | ✅ Implementado |
| Verificação automática | ✅ Implementado |
| Bloqueio automático após 365 dias | ✅ Implementado |
| Alertas visuais (Admin) | ✅ Implementado |
| Badges coloridos | ✅ Implementado |
| Alerta no dashboard do capitão | ✅ Implementado |
| Email de renovação | ✅ Implementado (simulado) |
| Botão "Solicitar Renovação" | ✅ Implementado |

---

## 📧 **SUPORTE**

Para dúvidas ou problemas:
- 📧 Email: servico@jauto.pt
- 🌐 Site: https://fishinghub-algarve.vercel.app/

---

**✅ Sistema de Revalidação Anual 100% funcional!**
