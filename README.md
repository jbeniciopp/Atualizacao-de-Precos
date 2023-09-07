# Atualização de Preços

## Instalação do Projeto
  - Faça o clone do Projeto com o comando:
    - `git clone git@github.com:jbeniciopp/Atualizacao-de-Precos.git`

  - Entre na pasta do repositório que você acabou de clonar:
    - `cd Atualizacao-de-Precos`

  - Instale as dependências:
    - `cd frontend`
    - `npm intall`
    - `cd ..`
    - `cd backend`
    - `npm install`
    - `cd ..`

  - Inicialize o projeto com Docker:
    - `docker compose up -d --build`
    - Aguarde alguns segundos para o projeto inicializar e popular o banco de dados.

  - Entre no link [http://localhost:5173/](http://localhost:5173/) para utilizar a aplicação.

  - Para parar o projeto use o comando `docker compose down --remove-orphans`.