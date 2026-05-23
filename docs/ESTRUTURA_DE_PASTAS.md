# 📁 Estrutura de Pastas — DevSquad · Academia

Este documento define a organização de pastas do projeto e serve como **referência obrigatória** para todos os integrantes. Seguir essa estrutura garante que qualquer pessoa do grupo encontre qualquer arquivo sem precisar perguntar.

> **Regra de ouro:** se você está em dúvida sobre onde colocar um arquivo, consulte este documento antes de criar uma pasta nova.

---

## 🗂️ Visão Geral — Monorepo

O projeto vive em **um único repositório** dividido em três pacotes:

```
academia/                        ← raiz do repositório
│
├── client/                      ← Frontend (React)
├── server/                      ← Backend (Node.js + Express)
│
├── .github/
│   └── workflows/
│       └── ci.yml               ← Pipeline de CI/CD
│
├── .gitignore
├── README.md
├── CONTRIBUTING.md
└── package.json                 ← Raiz — só scripts de conveniência
```

Cada pacote (`client/` e `server/`) tem seu próprio `package.json` e suas próprias dependências. A raiz **não instala dependências de aplicação** — serve só para rodar scripts que orquestram os dois juntos (ex: `npm run dev` na raiz sobe os dois).

---

## 🖥️ client/ — Frontend (React)

```
client/
│
├── public/                      ← Arquivos estáticos servidos diretamente
│   └── favicon.ico
│
├── src/
│   │
│   ├── assets/                  ← Imagens, ícones, fontes
│   │   └── logo.svg
│   │
│   ├── components/              ← Componentes reutilizáveis (sem lógica de negócio)
│   │   ├── ui/                  ← Componentes genéricos de interface
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Table.jsx
│   │   │
│   │   └── layout/              ← Estrutura visual da aplicação
│   │       ├── Sidebar.jsx
│   │       ├── Header.jsx
│   │       └── PageShell.jsx    ← Wrapper que combina Sidebar + Header
│   │
│   ├── pages/                   ← Uma pasta por módulo; cada arquivo = uma rota
│   │   ├── auth/
│   │   │   └── Login.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── clientes/
│   │   │   ├── ClientesLista.jsx
│   │   │   └── ClientesForm.jsx
│   │   │
│   │   ├── planos/
│   │   │   ├── PlanosLista.jsx
│   │   │   └── PlanosForm.jsx
│   │   │
│   │   ├── financeiro/
│   │   │   ├── Pagamentos.jsx
│   │   │   └── FluxoCaixa.jsx
│   │   │
│   │   └── inadimplencia/
│   │       └── Inadimplencia.jsx
│   │
│   ├── hooks/                   ← Custom hooks — lógica reutilizável de estado/efeito
│   │   ├── useAuth.js           ← Lê o token, verifica se está logado
│   │   ├── useClientes.js       ← Busca, cria, edita clientes
│   │   └── useCaixa.js          ← Abre, fecha, lista movimentações
│   │
│   ├── services/                ← Chamadas HTTP para a API (axios)
│   │   ├── api.js               ← Instância do axios com baseURL e interceptors
│   │   ├── authService.js
│   │   ├── clientesService.js
│   │   ├── planosService.js
│   │   ├── pagamentosService.js
│   │   ├── caixasService.js
│   │   └── inadimplenciaService.js
│   │
│   ├── contexts/                ← React Context — estado global da aplicação
│   │   └── AuthContext.jsx      ← Guarda usuário logado e token
│   │
│   ├── utils/                   ← Funções puras utilitárias (sem efeitos colaterais)
│   │   ├── formatters.js        ← formatCPF(), formatCurrency(), formatDate()
│   │   └── validators.js        ← validarCPF(), validarEmail()
│   │
│   ├── routes/                  ← Definição de rotas e proteção de acesso
│   │   ├── AppRoutes.jsx        ← Todas as rotas da aplicação
│   │   └── PrivateRoute.jsx     ← Redireciona para /login se não autenticado
│   │
│   ├── App.jsx                  ← Componente raiz — monta providers e rotas
│   └── main.jsx                 ← Entry point do Vite
│
├── index.html                   ← HTML base do Vite
├── vite.config.js
└── package.json
```

### Regras do `client/`

**`components/` vs `pages/`** — essa é a distinção mais importante:
- `components/` guarda peças reutilizáveis que **não conhecem a API** e podem aparecer em qualquer tela (botão, modal, tabela genérica).
- `pages/` guarda telas completas, cada uma vinculada a uma rota. Podem usar `hooks/` e `services/`.

**`services/` vs `hooks/`** — também importantes de separar:
- `services/` só faz a chamada HTTP e retorna os dados. Sem estado, sem efeito.
- `hooks/` usa o `service/` e gerencia estado local (`useState`, `useEffect`). É o que as páginas importam.

**Nomenclatura de arquivos:**
- Componentes e páginas: `PascalCase` — `ClientesForm.jsx`
- Hooks, services, utils: `camelCase` — `clientesService.js`, `useClientes.js`
- Um arquivo = uma responsabilidade. Evite arquivos com mais de 200 linhas — sinal de que está na hora de quebrar.

---

## ⚙️ server/ — Backend (Node.js + Express)

```
server/
│
├── src/
│   │
│   ├── controllers/             ← Recebe req, chama service, retorna res
│   │   ├── authController.js
│   │   ├── clientesController.js
│   │   ├── planosController.js
│   │   ├── pagamentosController.js
│   │   ├── caixasController.js
│   │   └── inadimplenciaController.js
│   │
│   ├── services/                ← Regras de negócio (sem Express, sem req/res)
│   │   ├── authService.js       ← Ex: gerarToken(), validarSenha()
│   │   ├── clientesService.js
│   │   └── inadimplenciaService.js  ← Ex: calcularInadimplentes()
│   │
│   ├── routes/                  ← Só mapeia URL + método → controller
│   │   ├── v1/
│   │   │   ├── index.js         ← Agrega todas as rotas da v1
│   │   │   ├── auth.js
│   │   │   ├── clientes.js
│   │   │   ├── planos.js
│   │   │   ├── pagamentos.js
│   │   │   ├── caixas.js
│   │   │   └── inadimplencia.js
│   │   └── status.js            ← GET /status (fora do versionamento)
│   │
│   ├── middlewares/             ← Funções que rodam entre a req e o controller
│   │   ├── auth.js              ← Valida JWT (autenticar, apenasAdmin)
│   │   └── asyncHandler.js      ← Captura erros de funções async
│   │
│   ├── lib/                     ← Instâncias e clientes de serviços externos
│   │   └── prisma.js            ← Singleton do PrismaClient
│   │
│   ├── jobs/                    ← Tarefas agendadas (cron jobs)
│   │   └── verificarInadimplencia.js  ← Roda diariamente às 00h
│   │
│   ├── app.js                   ← Configura o Express (middlewares + rotas)
│   └── server.js                ← Inicializa o servidor HTTP
│
├── prisma/
│   ├── schema.prisma            ← Modelagem do banco de dados
│   └── seed.js                  ← Dados iniciais para desenvolvimento
│
├── __tests__/                   ← Testes de integração (precisam do banco)
│   └── auth.integration.test.js
│
├── .env.example
└── package.json
```

### Regras do `server/`

**`controllers/` vs `services/`** — a camada de `services/` é opcional agora, mas importante de criar quando a lógica de negócio crescer:
- `controllers/` — sabe que existe `req` e `res`. Valida input, chama o service (ou o Prisma diretamente para casos simples) e monta a resposta.
- `services/` — não sabe que existe Express. Recebe dados puros, executa a regra, retorna resultado. Isso facilita testar sem precisar simular req/res.

**`jobs/`** — quando o M4 (inadimplência) precisar rodar automaticamente, o código vai aqui. Por enquanto a rota `POST /inadimplencia/verificar` serve, mas a estrutura já estará no lugar certo.

**Testes unitários** ficam junto ao arquivo que testam (`auth.test.js` ao lado de `authController.js`). Testes de integração, que sobem o banco real, ficam em `__tests__/`.

---

## 📐 Regras Gerais do Monorepo

### O que vai na raiz

A raiz do repositório **não é um pacote** — é o "teto" do monorepo. Só ficam aqui:

```
academia/
├── .github/         ← CI/CD e templates de PR/issue
├── .gitignore       ← Único .gitignore para o repositório inteiro
├── README.md
├── CONTRIBUTING.md
└── package.json     ← Só scripts de conveniência (npm run dev, npm test)
```

O `package.json` da raiz pode ter scripts como:
```json
{
  "scripts": {
    "dev":    "concurrently \"npm run dev --prefix client\" \"npm run dev --prefix server\"",
    "test":   "npm test --prefix server",
    "lint":   "npm run lint --prefix client && npm run lint --prefix server"
  }
}
```

### O que **nunca** vai na raiz
- `node_modules/` — cada pacote tem o seu
- Arquivos `.js` de aplicação
- Arquivos de configuração de framework (vite.config, etc.)

---

## 🚫 Anti-padrões — O que evitar

| ❌ Evitar | ✅ Fazer |
|:---|:---|
| `components/ClienteForm.jsx` com 400 linhas | Quebrar em componentes menores em `components/clientes/` |
| Chamar `axios` diretamente dentro de um componente/página | Criar um `service` e chamá-lo via `hook` |
| Colocar regra de negócio dentro do `controller` | Mover para um `service` quando a função crescer |
| Criar pasta `misc/`, `helpers2/`, `utils2/` | Nomear pela responsabilidade real do arquivo |
| Arquivo `index.js` que exporta tudo de uma pasta inteira | Importar diretamente do arquivo (`../controllers/authController`) |
| Variáveis de ambiente hardcoded no código | Sempre via `process.env.NOME_DA_VARIAVEL` com `.env.example` atualizado |

---

## 🔄 Como adicionar um novo módulo

Quando o grupo for implementar uma feature nova (ex: Relatórios no M5), o fluxo é:

**No backend (`server/`):**
1. Criar `src/controllers/relatoriosController.js`
2. Criar `src/routes/v1/relatorios.js`
3. Registrar a rota em `src/routes/v1/index.js`
4. Criar `src/controllers/relatorios.test.js`

**No frontend (`client/`):**
1. Criar pasta `src/pages/relatorios/`
2. Criar a página `RelatoriosPage.jsx` dentro dela
3. Criar `src/services/relatoriosService.js`
4. Criar `src/hooks/useRelatorios.js`
5. Registrar a rota em `src/routes/AppRoutes.jsx`

Cada passo desses vira um item no checklist da issue do GitHub.

---

*Documento mantido pelo DevSquad. Mudanças na estrutura devem ser discutidas em grupo e atualizadas aqui antes de implementadas.*
