# Sistema de Cadastro de Usuários

Um aplicativo web para cadastrar, visualizar, editar e excluir usuários. O aplicativo foi desenvolvido usando React para o frontend e Node.js com Express para o backend. Os dados são armazenados em um banco de dados MySQL.

## Configuração do Projeto

1. **Backend:**
   - Certifique-se de ter o Node.js instalado.
   - Instale as dependências do backend: ` npm install`
   - Navegue até a pasta do seu servidor: Nesse projeto `cd teste-fullstack e depois cd backend`
   - Inicie o servidor: `node app.js`
   - O servidor estará disponível em `http://localhost:3003`.

2. **Frontend:**
   - Navegue até o diretório frontend: Nesse projeto`cd teste-fullstack`
   - Instale as dependências do frontend: `npm install`
   - Inicie o aplicativo React: `npm start`
   - O aplicativo estará disponível em `http://localhost:3000`.

3. **Banco de Dados:**
   - Configure seu banco de dados MySQL e atualize as credenciais no arquivo `dbConnection.js`.

## Estrutura do Projeto

- **frontend:** Contém o código React para a interface do usuário.
- **backend:** Contém o código Node.js/Express para o servidor e interação com o banco de dados.
- **dbConnection.js:** Configuração de conexão com o banco de dados MySQL.
- **routes/:** Roteadores para diferentes operações no banco de dados.

## Funcionalidades

- **Cadastro:** Permite adicionar novos usuários com informações como CPF, nome, sobrenome, etc.
- **Listagem:** Exibe todos os usuários cadastrados.
- **Edição:** Permite editar as informações de um usuário existente.
- **Exclusão:** Remove um usuário do sistema.

## API Endpoints

## -  ROTA GET 
`/api/listarUsuarios`: Retorna todos os usuários cadastrados.

`Requisição`
Método: GET
URL: /api/listarUsuarios

Respostas

## Sucesso (Código: 200):
Corpo da Resposta (JSON):

{
  **"usuarios":** [
    {
      **"id":** `1`,
     **"cpf":** "`string"`,
      **"nome":** "`string"`,
      **"sobrenome":** "`string"`,
      **"dataNascimento":** ``YYYY-MM-DD``,
      **"email":** "`string"`,
      **"genero":** "``string"`
    },
  ]
}

## Nenhum Usuário Encontrado (Código: 404):
Corpo da Resposta (JSON):
{
  `message`: "Nenhum usuário encontrado."
}

## Erro Interno do Servidor (Código: 500):
{
 ` "error"`: "Erro interno no servidor. Por favor, tente novamente mais tarde."
}


## - ROTA DELETE 
`/api/excluirUsuario/:id`: Exclui um usuário com o ID fornecido.

`Requisição`
Método: DELETE
URL: /api/excluirUsuario/:id

Respostas
## Sucesso (Código: 200):
Corpo da Resposta (JSON):
{
  `message`: "Usuário excluído com sucesso!"
}

## Usuário Não Encontrado (Código: 404):
Corpo da Resposta (JSON):
{
 ` "error"`: "Usuário não encontrado."
}

## Erro Interno do Servidor (Código: 500):
Corpo da Resposta (JSON):
{
 ` "error"`: "Erro interno no servidor. Por favor, tente novamente mais tarde."
}

## -  ROTA PUT
- `/api/atualizarUsuario/:id`: Atualiza as informações de um usuário com o ID fornecido.

`Requisição`
**Método:** `PUT`
**URL:** `/api/atualizarUsuario/:id`
- **Corpo da Solicitação (JSON):**
  ```json
  {
    "cpf": "string",
    "nome": "string",
    "sobrenome": "string",
    "dataNascimento": "YYYY-MM-DD",
    "email": "string",
    "genero": "string"
  }
Respostas

## Sucesso (Código: 200):
Corpo da Resposta (JSON):
{
  `message`: "Informações do usuário atualizadas com sucesso!"
}

## Usuário Não Encontrado (Código: 404):
Corpo da Resposta (JSON):
{
 ` "error"`: "Usuário não encontrado."
}

## Erro de Validação (Código: 400):
Corpo da Resposta (JSON):
{
 ` "error"`: "Campos obrigatórios ausentes: [lista de campos ausentes]"
}

## Erro Interno do Servidor (Código: 500):
Corpo da Resposta (JSON):
{
 ` "error"`: "Erro interno no servidor. Por favor, tente novamente mais tarde."
}

## - ROTA POST `/api/cadastrarUsuarios`

Cadastra um novo usuário no sistema.

## Requisição

- **Método:** `POST`
- **URL:** `/api/cadastrarUsuarios`
- **Corpo da Solicitação (JSON):**
  ```json
  {
    "cpf":` "string",
    "nome":` "string",
    "sobrenome":` "string",
    "dataNascimento": "YYYY-MM-DD",
    "email":` "string",
    "genero":` "string"
  }

## Corpo da Solicitação (JSON):
{
    `"cpf":` *"string"*,
    `"nome":` *"string"*,
    `"sobrenome":` *"string"*,
    `"dataNascimento":` *"YYYY-MM-DD"*,
    `"email":` *"string"*,
   `"genero":` *"string"*
}

## Respostas
## Sucesso (Código: 201):

Corpo da Resposta (JSON):
{
  `message`: "Usuário cadastrado com sucesso!",
 ` "usuario"`: {
   ` "id":` *1*,
    `"cpf":` *"string"*,
    `"nome":` *"string"*,
    `"sobrenome":` *"string"*,
    `"dataNascimento":` *"YYYY-MM-DD"*,
    `"email":` *"string"*,
   ` "genero":` *"string"*
  }
}

## Erro de Validação (Código: 400):
Corpo da Resposta (JSON):
{
 ` "error"`: "Campos obrigatórios ausentes: [lista de campos ausentes]"
}

## Erro Interno do Servidor (Código: 500):
Corpo da Resposta (JSON):
{
 ` "error"`: "Erro interno no servidor. Por favor, tente novamente mais tarde."
}


## - ROTA DE TESTE PARA SIMULAÇÃO
-  `“https://api-teste.ip4y.com.br/cadastro`: End point somente para simulação conforme solicitado


`Requisição`
Método: POST
URL: https://api-teste.ip4y.com.br/cadastro

Respostas
## Sucesso (Código: 200):
Corpo da Resposta (JSON):
{
  `message`: "Simulação bem-sucedida."
}

## Erro Interno do Servidor (Código: 500):
Corpo da Resposta (JSON):
{
 ` "error"`: "Erro interno no servidor de simulação. Por favor, tente novamente mais tarde."
}

## Tecnologias Utilizadas

- **ReactJs:** Biblioteca JavaScript para construção da interface do usuário.
- **Material-UI:** Biblioteca de componentes React para um design mais fácil e rápido.
- **Node.js e Express:** Para o backend e criação de API.
- **MySQL:** Banco de dados relacional para armazenar informações de usuários.

## Dependencias
-  **Cpf**
-  **Cpf-check**
-  **Cpf-cnpj-validator**
-  **Date-fns**
-  **Dotenv**
-  **React-imask**
