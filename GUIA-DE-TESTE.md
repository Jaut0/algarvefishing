# 🎣 GUIA DE TESTE - ALGARVE TUNA CHARTER

## 📋 FLUXO COMPLETO DE TESTE DA PLATAFORMA

Este guia permite testar todo o sistema desde o registo de um capitão até à gestão completa.

---

## 🔄 PASSO 0: LIMPAR DADOS (COMEÇAR DO ZERO)

1. Abra: **reset-system.html**
2. Leia as informações sobre o que será removido
3. Clique em **"LIMPAR TODOS OS DADOS"**
4. Confirme a ação
5. ✅ Sistema limpo! Pode começar o teste

---

## 👨‍✈️ PASSO 1: REGISTAR CAPITÃO

### 1.1 Aceder ao Registo
- Abra: **auth.html**
- Clique no tab **"Registar"**
- Escolha **"Capitão"** (não "Privado")

### 1.2 Preencher Dados do Capitão
```
Nome Completo: João Silva
Email: joao@capitao.pt
Telefone: +351 912 345 678
Password: teste123
Confirmar Password: teste123

--- Dados Específicos de Capitão ---
Anos de Experiência: 15
Porto de Origem: Marina de Vilamoura
```

### 1.3 Upload de Documentos (3 OBRIGATÓRIOS)
- **Livrete**: Selecione qualquer ficheiro PDF ou imagem (livrete da embarcação)
- **RNAAT**: Selecione qualquer ficheiro PDF ou imagem (Registo Nacional de Aluguer de Atividades Turísticas)
- **Certificado de Seguro**: Selecione qualquer ficheiro PDF ou imagem (seguro marítimo válido)

**IMPORTANTE**: Os 3 documentos são obrigatórios! Sem eles não pode submeter o registo.

### 1.4 Submeter
- Clique em **"Registar"**
- ✅ Verá um alerta: **"Conta pendente de aprovação!"**
- ⏳ Estado: **PENDENTE**

---

## 🔐 PASSO 2: APROVAR CAPITÃO (COMO ADMIN)

### 2.1 Login Admin
- Abra: **admin-login.html**
- **Email**: servico@jauto.pt
- **Password**: 12345678
- Clique em **"Entrar"**

### 2.2 Ir para Aprovações
- No dashboard admin, veja o card **"Capitães Pendentes"**
- Clique no menu lateral em **"Capitães Pendentes"**

### 2.3 Revisar Dados do Capitão
- Veja todos os dados: Nome, Email, Experiência, Porto
- Veja os **3 documentos obrigatórios** enviados:
  - **Livrete** (clique para download)
  - **RNAAT** (clique para download)
  - **Certificado de Seguro** (clique para download)

### 2.4 Aprovar
- Clique em **"Aprovar Capitão"**
- Confirme a ação
- ✅ Capitão aprovado!
- Email de confirmação seria enviado (simulado)

### 2.5 Logout Admin
- Clique em **"Sair"** no topo

---

## 🎣 PASSO 3: LOGIN COMO CAPITÃO APROVADO

### 3.1 Login
- Abra: **auth.html**
- **Email**: joao@capitao.pt
- **Password**: teste123
- Clique em **"Entrar"**

### 3.2 Dashboard do Capitão
- ✅ Será redirecionado para: **dashboard-capitao.html**
- Veja as estatísticas
- Veja o menu lateral

---

## 🚢 PASSO 4: REGISTAR BARCO

### 4.1 Aceder ao Formulário
- No dashboard, clique em **"Registar Barco"** ou
- Abra directamente: **registar-barco.html**

### 4.2 ETAPA 1: Informações Básicas
```
Nome do Barco: Blue Marlin Hunter
Tipo de Barco: Traineira
Comprimento (metros): 14
Capacidade Máxima: 10
Ano de Fabrico: 2020
Matrícula: ALG-1234-PT
Porto de Registo: Marina de Vilamoura
Local de Operação: Algarve
```
Clique em **"Próximo"**

### 4.3 ETAPA 2: Motor e Performance
```
Tipo de Motor: Diesel
Potência (HP): 600
Velocidade Máxima (nós): 25
Alcance (milhas náuticas): 200
```
Clique em **"Próximo"**

### 4.4 ETAPA 3: Extras e Comodidades
Selecione (marque os checkboxes):
- ✅ GPS
- ✅ Sonar
- ✅ Radar
- ✅ Rádio VHF
- ✅ Sanita
- ✅ Cozinha
- ✅ Cadeiras de Combate
- ✅ Coletes Salva-Vidas

Clique em **"Próximo"**

### 4.5 ETAPA 4: Fotos
- Clique em **"Selecionar Fotos"**
- Escolha pelo menos 3 imagens do barco
- Veja o preview das fotos
- Clique em **"Próximo"**

### 4.6 ETAPA 5: Documentação (OBRIGATÓRIO)
Upload dos 3 documentos:
- **Livrete do Barco**: PDF ou imagem
- **Certificado RNAAT**: PDF ou imagem
- **Certificado de Seguro**: PDF ou imagem

Observações (opcional):
```
Barco profissional equipado para pesca ao atum gigante. 
Sonar de última geração e cadeiras de combate.
```

### 4.7 Submeter
- Clique em **"Registar Barco"**
- ✅ Verá toast: **"Barco registado! Aguarda aprovação"**
- ⏳ Estado do barco: **PENDENTE**

---

## 🔐 PASSO 5: APROVAR BARCO (COMO ADMIN)

### 5.1 Login Admin Novamente
- **admin-login.html**
- Email: servico@jauto.pt / Pass: 12345678

### 5.2 Ir para Barcos Pendentes
- No menu lateral, clique em **"Barcos Pendentes"**
- Veja o barco "Blue Marlin Hunter" pendente

### 5.3 Revisar Barco
- Veja todos os dados do barco
- Veja as fotos enviadas
- **Download dos documentos**:
  - Livrete do Barco
  - Certificado RNAAT
  - Certificado de Seguro

### 5.4 Aprovar Barco
- Clique em **"Aprovar Barco"**
- Confirme
- ✅ Barco aprovado e ATIVO!

### 5.5 Logout Admin

---

## 📅 PASSO 6: CRIAR SAÍDA DE PESCA

### 6.1 Login como Capitão
- **auth.html** → joao@capitao.pt / teste123

### 6.2 Criar Saída
- No dashboard, clique em **"Criar Saída"** ou
- Abra: **criar-saida.html**

### 6.3 Preencher Formulário
```
Selecionar Barco: Blue Marlin Hunter

Título: Expedição de Blue Fin Tuna

Descrição:
Aventura épica de pesca ao atum rabilho gigante! 
Sairemos em busca dos maiores Blue Fin do Atlântico.
Equipamento de topo, sonar profissional e capitão experiente.

Tipos de Pesca (marcar):
✅ Blue Fin Tuna
✅ Big Game Fishing
✅ Trolling

Data de Partida: [escolher data futura]
Hora: 07:00
Duração (horas): 8

Porto de Partida: Marina de Vilamoura

Número Máximo de Pescadores: 8

Preço por Pessoa: 150€

O que está incluído:
- Equipamento de pesca profissional
- Iscas e chumming
- Capitão e marinheiro experientes
- Seguro
- Água e snacks

Nível de Dificuldade: Alto

Regras Importantes:
- Chegar 30 minutos antes
- Trazer roupa adequada
- Protetor solar obrigatório
```

### 6.4 Submeter
- Clique em **"Criar Saída"**
- ✅ Saída criada com sucesso!

---

## 👤 PASSO 7: TESTAR COMO CLIENTE

### 7.1 Logout do Capitão
- Clique em **"Sair"**

### 7.2 Registar Cliente
- **auth.html** → Tab "Registar"
- Escolher **"Privado"** (não Capitão)
```
Nome: Maria Santos
Email: maria@cliente.pt
Telefone: +351 965 123 456
Password: cliente123
```

### 7.3 Ver Barcos Disponíveis
- Abra: **escolher-barco.html**
- ✅ Veja o barco "Blue Marlin Hunter" aprovado!

### 7.4 Reservar Barco
- Clique em **"Ver Agenda e Reservar"**
- Veja o calendário do barco
- Selecione 2-3 dias disponíveis
- Preencha o formulário:
```
Nome: Maria Santos
Email: maria@cliente.pt
Telefone: +351 965 123 456
Nº Pescadores: 4
Mensagem: Grupo de amigos interessado em pesca ao atum!
```
- Clique em **"Enviar Pedido de Reserva"**
- ✅ Pedido enviado! Estado: PENDENTE

---

## 🎯 PASSO 8: GERIR PEDIDO (COMO CAPITÃO)

### 8.1 Login como Capitão
- **auth.html** → joao@capitao.pt / teste123

### 8.2 Ver Pedidos Pendentes
- No dashboard, veja secção **"Pedidos de Reserva Pendentes"**
- ✅ Veja o pedido de Maria Santos!
- Dados visíveis:
  - Nome, email, telefone
  - Dias solicitados
  - Número de pescadores
  - Mensagem

### 8.3 Opções:
1. **Ligar** → Abre tel:+351965123456
2. **Email** → Abre mailto
3. **WhatsApp** → Abre WhatsApp
4. **Aceitar** → Marca dias como RESERVADOS
5. **Rejeitar** → Rejeita o pedido

### 8.4 Aceitar Pedido
- Clique em **"Aceitar e Reservar Dias"**
- Confirme
- ✅ Dias ficam RESERVADOS na agenda!

---

## 📅 PASSO 9: GERIR AGENDA

### 9.1 Aceder à Agenda
- No dashboard do capitão, clique em **"Gerir Agenda"**
- Abra: **gerir-agenda.html**

### 9.2 Testar Funcionalidades

#### Bloquear 1 Dia:
- Clique num dia disponível
- Escolha estado: **"Bloqueado"**
- Notas: "Manutenção do barco"
- Clique **"Guardar"**

#### Bloquear Período (Férias):
- Clique em **"Bloquear Período"**
- Data Início: [próxima semana]
- Data Fim: [7 dias depois]
- Motivo: **"Férias"**
- Observações: "Férias anuais"
- Clique **"Bloquear Dias"**
- ✅ Todos os dias bloqueados!

#### Ver Bloqueios Ativos:
- Clique em **"Ver Bloqueios"**
- Veja lista de bloqueios
- Pode remover clicando em **"Remover"**

---

## 🆘 PASSO 10: TESTAR RECLAMAÇÃO

### 10.1 Aceder ao Suporte
- Abra: **suporte.html**

### 10.2 Criar Reclamação
- Escolher tipo: **"Cancelamento"**
- Preencher formulário:
```
Nome: Maria Santos
Email: maria@cliente.pt
Telefone: +351 965 123 456

Barco: Blue Marlin Hunter
Capitão: João Silva
Data Reserva: [data da reserva]
Valor Pago: 600€

Assunto: Cancelamento de última hora

Descrição:
O capitão cancelou a saída 1 dia antes por motivos 
pessoais. Já tinha viajado para o Algarve e feito despesas.
Quero reembolso total.
```

### 10.3 Upload de Evidências (opcional)
- Anexar screenshots de conversas
- Anexar comprovativos de pagamento

### 10.4 Enviar
- Clique em **"Enviar Reclamação"**
- ✅ Caso criado! Número: #[timestamp]

---

## 🔐 PASSO 11: GERIR RECLAMAÇÃO (COMO ADMIN)

### 11.1 Login Admin
- **admin-login.html**

### 11.2 Ver Reclamações
- No menu lateral, clique em **"Reclamações"**
- Badge mostra: **1 pendente**

### 11.3 Analisar Caso
- Veja todos os dados
- Veja evidências anexadas
- Clique em **"Marcar Em Análise"**

### 11.4 Adicionar Notas Internas
- Clique em **"Adicionar Notas"**
- Escrever:
```
Contactei o capitão João Silva. 
Confirmou cancelamento por avaria no motor.
Cliente tem razão, merece reembolso.
```

### 11.5 Contactar Cliente
- Clique em **"Contactar Cliente"**
- Escolher: Email / Telefone / WhatsApp

### 11.6 Resolver
- Clique em **"Marcar como Resolvida"**
- Nota de resolução:
```
Caso resolvido. Capitão efetuou reembolso total de 600€.
Cliente satisfeito. Oferecemos voucher de 10% desconto na próxima reserva.
```
- ✅ Caso RESOLVIDO!

---

## ✅ CHECKLIST COMPLETA

Use esta checklist para garantir que testou tudo:

### Registo e Aprovação
- [ ] Limpar dados (reset-system.html)
- [ ] Registar capitão com documentos
- [ ] Verificar estado PENDENTE
- [ ] Aprovar capitão como admin
- [ ] Login como capitão aprovado

### Gestão de Barcos
- [ ] Registar barco (5 etapas)
- [ ] Upload de 3 documentos
- [ ] Upload de fotos
- [ ] Verificar estado PENDENTE
- [ ] Aprovar barco como admin
- [ ] Ver barco em escolher-barco.html

### Saídas e Reservas
- [ ] Criar saída de pesca
- [ ] Ver saída em explorar.html
- [ ] Registar cliente
- [ ] Cliente fazer reserva (até 5 dias)
- [ ] Ver pedido pendente no dashboard capitão
- [ ] Capitão aceitar reserva
- [ ] Dias marcados como RESERVADOS

### Agenda
- [ ] Bloquear 1 dia específico
- [ ] Bloquear período (férias)
- [ ] Ver bloqueios ativos
- [ ] Remover bloqueio
- [ ] Marcar dia como reservado (manual)

### Suporte
- [ ] Enviar reclamação como cliente
- [ ] Upload de evidências
- [ ] Admin ver reclamação
- [ ] Marcar como "Em Análise"
- [ ] Adicionar notas internas
- [ ] Contactar cliente
- [ ] Resolver caso

### Geral
- [ ] Testar menu mobile
- [ ] Testar todas as navegações
- [ ] Ver estatísticas no dashboard
- [ ] Testar logout/login múltiplos
- [ ] Verificar responsividade mobile

---

## 🐛 PROBLEMAS COMUNS E SOLUÇÕES

### Problema: "Nenhum barco disponível"
**Solução**: Certifique-se que:
1. Registou um capitão
2. Admin aprovou o capitão
3. Capitão registou um barco
4. Admin aprovou o barco

### Problema: "Conta pendente"
**Solução**: 
1. Faça login como admin
2. Aprove o capitão em "Capitães Pendentes"

### Problema: Dados não aparecem
**Solução**: 
1. Limpe o cache do browser (Ctrl+Shift+Del)
2. Ou use reset-system.html para limpar

### Problema: Fotos não aparecem
**Solução**: 
As fotos são armazenadas como Data URLs no localStorage.
Para produção, precisa de integrar com cloud storage.

---

## 📞 CREDENCIAIS DE TESTE

### Admin
- URL: admin-login.html
- Email: servico@jauto.pt
- Password: 12345678

### Capitão (exemplo após registo)
- Email: joao@capitao.pt
- Password: teste123

### Cliente (exemplo após registo)
- Email: maria@cliente.pt
- Password: cliente123

---

## 🎯 PRÓXIMOS PASSOS (PRODUÇÃO)

Após validar todo o fluxo em localhost:

1. **Backend API**:
   - Node.js/Express ou Python/FastAPI
   - Base de dados (PostgreSQL/MongoDB)
   - Upload real de ficheiros (AWS S3/Cloudinary)

2. **Autenticação Real**:
   - JWT tokens
   - Hash de passwords (bcrypt)
   - Sessões seguras

3. **Emails Transaccionais**:
   - SendGrid ou Mailgun
   - Templates de aprovação/rejeição
   - Notificações de reservas

4. **Pagamentos** (opcional):
   - Stripe ou PayPal
   - Ou manter contacto directo

5. **Deploy**:
   - Vercel/Netlify (frontend)
   - Heroku/Railway (backend)
   - Configurar domínio

---

## 🎣 BOA SORTE!

Teste todo o fluxo e corrija o que for necessário antes do deploy! 🚀

**Algarve Tuna Charter** - Big Game Fishing Platform
