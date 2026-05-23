<div align="center">

<h1>🏋️ Academia · DevSquad</h1>

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow.svg)]()
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)]()
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?logo=postgresql&logoColor=white)]()
[![CI](https://github.com/f0l0d653/sistema_academia/actions/workflows/ci.yml/badge.svg)](../../actions/workflows/ci.yml)

<p>
  <a href="#português">🇧🇷 Português</a> &nbsp;|&nbsp;
  <a href="#english">🇺🇸 English</a>
</p>

</div>

<!-- LAST_UPDATE_START -->
> 🕐 **Última atualização:** — *(atualizado automaticamente pelo GitHub Actions a cada push)*
<!-- LAST_UPDATE_END -->

---

<div id="português">

## 🇧🇷 Português

Sistema de gestão de academias com controle financeiro, automação de inadimplência e fluxo de caixa diário — desenvolvido pelo grupo DevSquad.

### 📑 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como Instalar](#como-instalar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API](#api)
- [Testes e CI/CD](#testes-e-cicd)
- [Como Contribuir](#como-contribuir)
- [Licença](#licença)

> 📐 **Guia completo de estrutura de pastas, regras e anti-padrões:** [`docs/ESTRUTURA_DE_PASTAS.md`](docs/ESTRUTURA_DE_PASTAS.md)

---

### Sobre o Projeto

O **Academia DevSquad** é um sistema web completo para gestão de academias, desenvolvido como projeto de aprendizado pelo grupo **DevSquad**. O foco principal é automatizar o que mais consome tempo no dia a dia de uma academia: controle de mensalidades, identificação de inadimplentes e movimentação de caixa.

**Diferenciais do sistema:**

- Bloqueio automático de acesso por inadimplência
- Fluxo de caixa diário com abertura e fechamento
- Dashboard com indicadores em tempo real
- Geração de relatórios exportáveis

---

### Funcionalidades

<!--✅-->

#### 🔜 Autenticação e Segurança
- Login com JWT
- Rotas protegidas por middleware
- Controle de acesso por papel (`ADMIN`, `STAFF`)

#### 🔜 Cadastro de Clientes
- Inclusão e edição de dados pessoais (nome, CPF, e-mail, telefone)
- Vínculo a um plano de assinatura ativo
- Listagem com filtros por nome e status

#### 🔜 Gestão de Planos
- Criação e configuração de planos (mensal, trimestral, anual)
- Cupons de desconto e promoções sazonais

#### 🔜 Controle Financeiro
- Lançamento de pagamentos com atualização automática de status
- Fluxo de caixa diário: abertura, movimentações e fechamento
- Registro de despesas operacionais

#### 🔜 Controle de Inadimplência
- Verificação automática de vencimentos
- Alertas ao staff sobre clientes em atraso
- Bloqueio e desbloqueio de acesso

#### 🔜 Relatórios _(fase 2)_
- Faturamento por período
- Inadimplência com valor total em aberto
- Exportação para CSV/PDF

---

### Tecnologias

| Camada | Tecnologia | Descrição |
|:---|:---|:---|
| **Frontend** | React 18 + JavaScript | Interface moderna e responsiva |
| **Backend** | Node.js 20 + Express 4 | API REST robusta e escalável |
| **Banco de dados** | PostgreSQL 15 | Banco relacional com suporte a transações |
| **ORM** | Prisma | Acesso a dados com migrations automáticas |
| **Autenticação** | JWT | Tokens seguros para sessões |
| **CI/CD** | GitHub Actions | Pipeline automatizado de testes |
| **Testes** | Jest | Testes unitários e de integração |

---

### Como Instalar

#### Pré-requisitos

- Node.js 20+
- PostgreSQL 15+
- Git

#### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/devsquad/academia.git
cd academia

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do PostgreSQL e um JWT_SECRET
```

#### Banco de dados

```bash
# Criar as tabelas
npx prisma migrate dev

# Popular com dados iniciais (admin + planos de exemplo)
npx prisma db seed

# Abrir interface visual do banco (opcional)
npx prisma studio
```

#### Rodar o projeto

```bash
# Modo desenvolvimento (com hot reload)
npx nodemon src/server.js

# Modo produção
npm start
```

O servidor estará disponível em `http://localhost:3000`.  
Acesse `http://localhost:3000/status` para verificar se a API está saudável.

---

### Estrutura do Projeto

O projeto é um **monorepo** com dois pacotes independentes. A raiz contém apenas configurações e scripts que orquestram os dois juntos.

```
academia/                            ← raiz do repositório
├── client/                          ← Frontend (React)
├── server/                          ← Backend (Node.js + Express)
├── .github/
│   └── workflows/
│       └── ci.yml                   ← Pipeline de CI/CD
├── .gitignore
├── README.md
├── CONTRIBUTING.md
└── package.json                     ← Scripts de conveniência (npm run dev sobe os dois)
```

#### 🖥️ client/ — Frontend

```
client/
├── src/
│   ├── assets/                      ← Imagens, ícones, fontes
│   ├── components/
│   │   ├── ui/                      ← Button, Input, Modal, Table (sem lógica de API)
│   │   └── layout/                  ← Sidebar, Header, PageShell
│   ├── pages/                       ← Uma pasta por módulo; cada arquivo = uma rota
│   │   ├── auth/         Login.jsx
│   │   ├── dashboard/    Dashboard.jsx
│   │   ├── clientes/     ClientesLista.jsx  ClientesForm.jsx
│   │   ├── planos/       PlanosLista.jsx    PlanosForm.jsx
│   │   ├── financeiro/   Pagamentos.jsx     FluxoCaixa.jsx
│   │   └── inadimplencia/Inadimplencia.jsx
│   ├── hooks/                       ← useAuth.js  useClientes.js  useCaixa.js
│   ├── services/                    ← api.js  authService.js  clientesService.js ...
│   ├── contexts/                    ← AuthContext.jsx
│   ├── utils/                       ← formatters.js  validators.js
│   ├── routes/                      ← AppRoutes.jsx  PrivateRoute.jsx
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

> **Regra:** `services/` só faz a chamada HTTP. `hooks/` usa o service e gerencia estado. Páginas importam hooks, nunca services diretamente.

#### ⚙️ server/ — Backend

```
server/
├── src/
│   ├── controllers/                 ← Recebe req → chama Prisma → retorna res
│   │   ├── authController.js
│   │   ├── clientesController.js
│   │   ├── planosController.js
│   │   ├── pagamentosController.js
│   │   ├── caixasController.js
│   │   └── inadimplenciaController.js
│   ├── services/                    ← Regras de negócio (sem Express, sem req/res)
│   ├── routes/
│   │   ├── status.js                ← GET /status (fora do versionamento)
│   │   └── v1/                      ← index.js + um arquivo por módulo
│   ├── middlewares/                 ← auth.js (JWT)  asyncHandler.js
│   ├── lib/                         ← prisma.js (singleton)
│   ├── jobs/                        ← verificarInadimplencia.js (cron 00h)
│   ├── app.js
│   └── server.js
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── __tests__/                       ← Testes de integração (precisam do banco)
└── package.json
```

> Guia completo com regras, anti-padrões e fluxo para novos módulos: [`docs/ESTRUTURA_DE_PASTAS.md`](docs/ESTRUTURA_DE_PASTAS.md)

---

### API

Todos os endpoints seguem o padrão `/api/v1/...`.

#### Endpoint de saúde

```
GET /status
```

```json
{
  "status": "ok",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 3600,
  "timestamp": "2026-05-19T12:00:00.000Z",
  "database": "ok"
}
```

#### Autenticação

```
POST /api/v1/auth/login
```

#### Clientes

```
GET    /api/v1/clientes         Lista com filtros por nome/status
POST   /api/v1/clientes         Cadastrar novo cliente
GET    /api/v1/clientes/:id     Buscar cliente por ID
PUT    /api/v1/clientes/:id     Editar cliente
```

#### Planos

```
GET    /api/v1/planos           Listar planos disponíveis
POST   /api/v1/planos           Criar plano (admin)
PUT    /api/v1/planos/:id       Editar plano (admin)
```

#### Pagamentos e Caixa

```
POST   /api/v1/pagamentos       Registrar pagamento
GET    /api/v1/pagamentos       Histórico de pagamentos

POST   /api/v1/caixas/abrir     Abrir caixa do dia
POST   /api/v1/caixas/fechar    Fechar caixa do dia
GET    /api/v1/caixas/hoje      Movimentações do dia
POST   /api/v1/caixas/transacao Lançar entrada ou saída
```

#### Inadimplência

```
GET    /api/v1/inadimplencia           Lista de inadimplentes
PATCH  /api/v1/inadimplencia/:id/bloquear     Bloquear acesso
PATCH  /api/v1/inadimplencia/:id/desbloquear  Desbloquear acesso
```

> Todas as rotas (exceto `/status` e `/api/v1/auth/login`) exigem o header:
> `Authorization: Bearer <token>`

---

### Testes e CI/CD

```bash
# Rodar todos os testes
npm test
```

O pipeline do **GitHub Actions** roda automaticamente em todo push para `dev` e `main`, e em todo Pull Request. Ele:

1. Instala as dependências
2. Sobe um PostgreSQL temporário
3. Roda as migrations
4. Executa os testes
5. Verifica o endpoint `/status`

**O PR só pode ser mergeado se o CI passar.**

---

### Como Contribuir

Consulte o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para o guia completo.

Resumo rápido:

1. Faça um **Fork** do projeto
2. Crie uma **branch**: `git checkout -b feat/minha-feature`
3. **Commit**: `git commit -m "feat: adiciona minha feature"`
4. **Push**: `git push origin feat/minha-feature`
5. Abra um **Pull Request** para a branch `dev`

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.

---

### Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.

---

### 👥 Contributors

<!-- CONTRIBUTORS_START -->
*(lista atualizada automaticamente pelo GitHub Actions)*
<!-- CONTRIBUTORS_END -->

---

</div>

---

<div id="english">

## 🇺🇸 English

A gym management system with financial control, automated delinquency handling and daily cash flow — built by the DevSquad group.

### 📑 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API](#api-1)
- [Tests & CI/CD](#tests--cicd)
- [Contributing](#contributing)
- [License](#license-1)

> 📐 **Full folder structure guide, rules and anti-patterns:** [`docs/ESTRUTURA_DE_PASTAS.md`](docs/ESTRUTURA_DE_PASTAS.md)

---

### About

**Academia DevSquad** is a full-stack web system for gym management, built as a learning project by the **DevSquad** group. The main focus is automating what takes the most time in a gym's day-to-day: membership billing, delinquency identification and cash flow management.

**Key highlights:**

- Automatic access blocking for overdue members
- Daily cash register with open/close workflow
- Real-time dashboard with key indicators
- Exportable reports

---

### Features

<!--✅-->

#### 🔜 Authentication & Security
- JWT-based login
- Route protection via middleware
- Role-based access control (`ADMIN`, `STAFF`)

#### 🔜 Member Management
- Create and edit member profiles (name, CPF, email, phone)
- Link to an active subscription plan
- List with filters by name and status

#### 🔜 Plan Management
- Create and configure plans (monthly, quarterly, annual)
- Discount coupons and seasonal promotions

#### 🔜 Financial Control
- Payment registration with automatic status update
- Daily cash register: open, transactions and close
- Operational expense tracking

#### 🔜 Delinquency Control
- Automatic due date verification
- Staff alerts for overdue members
- Access blocking and unblocking

#### 🔜 Reports _(phase 2)_
- Revenue by period
- Delinquency with total outstanding amount
- CSV/PDF export

---

### Tech Stack

| Layer | Technology | Description |
|:---|:---|:---|
| **Frontend** | React 18 + JavaScript | Modern, responsive UI |
| **Backend** | Node.js 20 + Express 4 | Robust and scalable REST API |
| **Database** | PostgreSQL 15 | Relational DB with transaction support |
| **ORM** | Prisma | Type-safe data access with auto migrations |
| **Auth** | JWT | Secure session tokens |
| **CI/CD** | GitHub Actions | Automated test pipeline |
| **Testing** | Jest | Unit and integration tests |

---

### Getting Started

#### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Git

#### Installation

```bash
# 1. Clone the repository
git clone https://github.com/devsquad/academia.git
cd academia

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials and a JWT_SECRET
```

#### Database

```bash
# Create tables
npx prisma migrate dev

# Seed with initial data (admin + sample plans)
npx prisma db seed

# Open visual database interface (optional)
npx prisma studio
```

#### Running

```bash
# Development mode (with hot reload)
npx nodemon src/server.js

# Production mode
npm start
```

The server will be available at `http://localhost:3000`.  
Visit `http://localhost:3000/status` to check the API health.

---

### Project Structure

The project is a **monorepo** with two independent packages. The root only holds configs and scripts that orchestrate both together.

```
academia/                            ← repository root
├── client/                          ← Frontend (React)
├── server/                          ← Backend (Node.js + Express)
├── .github/
│   └── workflows/
│       └── ci.yml                   ← CI/CD pipeline
├── .gitignore
├── README.md
├── CONTRIBUTING.md
└── package.json                     ← Convenience scripts (npm run dev starts both)
```

#### 🖥️ client/ — Frontend

```
client/
├── src/
│   ├── assets/                      ← Images, icons, fonts
│   ├── components/
│   │   ├── ui/                      ← Button, Input, Modal, Table (no API logic)
│   │   └── layout/                  ← Sidebar, Header, PageShell
│   ├── pages/                       ← One folder per module; each file = one route
│   │   ├── auth/         Login.jsx
│   │   ├── dashboard/    Dashboard.jsx
│   │   ├── clientes/     ClientesLista.jsx  ClientesForm.jsx
│   │   ├── planos/       PlanosLista.jsx    PlanosForm.jsx
│   │   ├── financeiro/   Pagamentos.jsx     FluxoCaixa.jsx
│   │   └── inadimplencia/Inadimplencia.jsx
│   ├── hooks/                       ← useAuth.js  useClientes.js  useCaixa.js
│   ├── services/                    ← api.js  authService.js  clientesService.js ...
│   ├── contexts/                    ← AuthContext.jsx
│   ├── utils/                       ← formatters.js  validators.js
│   ├── routes/                      ← AppRoutes.jsx  PrivateRoute.jsx
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

> **Rule:** `services/` only makes HTTP calls. `hooks/` uses the service and manages state. Pages import hooks, never services directly.

#### ⚙️ server/ — Backend

```
server/
├── src/
│   ├── controllers/                 ← Receives req → calls Prisma → returns res
│   │   ├── authController.js
│   │   ├── clientesController.js
│   │   ├── planosController.js
│   │   ├── pagamentosController.js
│   │   ├── caixasController.js
│   │   └── inadimplenciaController.js
│   ├── services/                    ← Business logic (no Express, no req/res)
│   ├── routes/
│   │   ├── status.js                ← GET /status (outside versioning)
│   │   └── v1/                      ← index.js + one file per module
│   ├── middlewares/                 ← auth.js (JWT)  asyncHandler.js
│   ├── lib/                         ← prisma.js (singleton)
│   ├── jobs/                        ← verificarInadimplencia.js (cron 00h)
│   ├── app.js
│   └── server.js
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── __tests__/                       ← Integration tests (require real database)
└── package.json
```

> Full guide with rules, anti-patterns and workflow for new modules: [`docs/ESTRUTURA_DE_PASTAS.md`](docs/ESTRUTURA_DE_PASTAS.md)

---

### API

All endpoints follow the pattern `/api/v1/...`.

#### Health check

```
GET /status
```

```json
{
  "status": "ok",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 3600,
  "timestamp": "2026-05-19T12:00:00.000Z",
  "database": "ok"
}
```

#### Authentication

```
POST /api/v1/auth/login
```

#### Members

```
GET    /api/v1/clientes         List with name/status filters
POST   /api/v1/clientes         Create new member
GET    /api/v1/clientes/:id     Get member by ID
PUT    /api/v1/clientes/:id     Update member
```

#### Plans

```
GET    /api/v1/planos           List available plans
POST   /api/v1/planos           Create plan (admin only)
PUT    /api/v1/planos/:id       Update plan (admin only)
```

#### Payments & Cash Register

```
POST   /api/v1/pagamentos       Register payment
GET    /api/v1/pagamentos       Payment history

POST   /api/v1/caixas/abrir     Open daily cash register
POST   /api/v1/caixas/fechar    Close daily cash register
GET    /api/v1/caixas/hoje      Today's transactions
POST   /api/v1/caixas/transacao Log an entry or expense
```

#### Delinquency

```
GET    /api/v1/inadimplencia               List overdue members
PATCH  /api/v1/inadimplencia/:id/bloquear     Block access
PATCH  /api/v1/inadimplencia/:id/desbloquear  Unblock access
```

> All routes (except `/status` and `/api/v1/auth/login`) require the header:
> `Authorization: Bearer <token>`

---

### Tests & CI/CD

```bash
# Run all tests
npm test
```

The **GitHub Actions** pipeline runs automatically on every push to `dev` and `main`, and on every Pull Request. It:

1. Installs dependencies
2. Spins up a temporary PostgreSQL instance
3. Runs migrations
4. Executes tests
5. Checks the `/status` endpoint

**A PR can only be merged if CI passes.**

---

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

Quick summary:

1. **Fork** the project
2. Create a **branch**: `git checkout -b feat/my-feature`
3. **Commit**: `git commit -m "feat: add my feature"`
4. **Push**: `git push origin feat/my-feature`
5. Open a **Pull Request** targeting the `dev` branch

We use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.

---

### License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

</div>
