# 🤝 Guia de Contribuição · DevSquad

Que bom ter você no time de desenvolvimento do **Sistema Academia**! Para manter nosso código organizado, limpo e funcionando, siga os padrões descritos neste documento.

---

## 🌿 Fluxo de Branches

O projeto segue um modelo simplificado baseado em Git Flow. Nossas ramificações principais são:

* `main`: Contém apenas código estável e pronto para produção.
* `dev`: Ramificação de integração. Todo desenvolvimento passa por aqui antes de ir para a `main`.

### Passos para desenvolver uma nova funcionalidade ou correção:

1.  **Atualize seu repositório local** com a branch `dev` mais recente:
    ```bash
    git checkout dev
    git pull origin dev
    ```
2.  **Crie uma ramificação secundária** (*feature branch*) a partir da `dev`:
    ```bash
    git checkout -b feat/nome-da-funcionalidade
    # ou para correções de bugs:
    git checkout -b fix/nome-do-bug
    ```
3.  **Desenvolva e faça o commit** das suas alterações localmente (veja as regras de commits abaixo).
4.  **Envie sua branch** para o GitHub:
    ```bash
    git push origin feat/nome-da-funcionalidade
    ```
5.  **Abra um Pull Request (PR)** apontando a sua branch exclusivamente para a branch `dev`.
6.  Aguarde a revisão de pelo menos mais um integrante do grupo antes de realizar o Merge.

---

## 💬 Padrão de Commits

Utilizamos o padrão de **Conventional Commits** para manter o histórico de alterações legível. Todos os commits devem seguir a estrutura:

`tipo: descrição curta em português`

### Principais tipos:
* `feat`: Criação de uma nova funcionalidade (ex: `feat: adiciona tela de cadastro de clientes`).
* `fix`: Correção de um bug ou comportamento inesperado (ex: `fix: corrige validação de CPF no formulário`).
* `docs`: Alteração exclusiva em documentações (ex: `docs: adiciona guia de contribuição`).
* `style`: Mudanças de formatação/estética que não afetam a lógica (ex: `style: formata espacamentos com prettier`).
* `refactor`: Modificação no código que não altera o comportamento final (ex: `refactor: otimiza query de busca do prisma`).

---

## 🛠️ Padrão de Código

Antes de abrir o Pull Request, certifique-se de que:
* O código não possui variáveis declaradas e não utilizadas.
* Não há dados sensíveis expostos (como senhas ou chaves de API).
* Os testes locais rodam sem quebras (`npm test`, se aplicável).
