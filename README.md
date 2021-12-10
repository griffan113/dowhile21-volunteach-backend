<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# DoWhile 2021 | FortBrasil NestJS

# Volunteach

## Descrição do projeto

VolunTeach é uma plataforma de recrutamento de professores voluntários onde as escolas se cadastram e criam trabalhos voluntários. Os professores podem se inscrever nos trabalhos que combinam com as matérias que dão aula. Há dois tipos de usuários na aplicação, os professores e os comuns. Os usuários comuns podem criar escolas e trabalhos voluntários, enquanto os professores podem se increver nos trabalhos e nas matérias. A aplicação limita determinadas rodas de determinados usuários, por exemplo, um professor não tem acesso a rota de criação de escolas.

## Importando o JSON de requests

Está disponível em `common/sync` o arquivo para sincronização de requests do Insomnia, basta baixar o arquivo e importá-lo na tela inicial do Insomnia para ter todas as requisições prontas.

## Regras básicas:

- Um professor pode ensinar várias matérias
- Um professor pode se inscrever em diversos trabalhos voluntários
- Uma escola é criada por um usuário comum
- Uma escola pode possuir diversos trabalhos voluntários
- Um trabalho voluntário pode possuir diversos professores

## Instação

- Renomeie o arquivo `.env.example` para `.env`

```bash
$ npm install
```

### É necessário estar com o Postgres rodando localmente na porta 5432

## Rodando as migrations do banco

```bash
$ yarn prisma migrate dev
```

## Rodando as seeds do banco (Caso não sejam executas junto com as migrations)

```bash
$ yarn prisma migrate dev
```

## Rodando o app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

`#BuildTheFuture`
