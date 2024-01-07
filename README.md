# Challange 02 - Daily Diet API

Neste desafio foi necessário realizar do desenvolvimento de uma API para controle de dieta diária, o nome da API é: Daily Diet API.

### Features

- [ ] Realizar o cadastro de um usuário
- [ ] Identificar o usuário entre requisições
- [ ] Realizar o registro de uma refeição feita, com os seguintes dados:
  - Nome
  - Descrição
  - Data e hora
  - Está dentro ou não da dieta
- [ ] Realizar a edição de refeições, podendo alterar todos os dados acima
- [ ] Realizar a exclusão de uma refeição
- [ ] Realizar a obtenção de todas as refeições do usuário
- [ ] Realizar a obtenção de uma única refeição do usuário
- [ ] Realizar a obtenção de métricas do usuário
  - Quantidade total de refeições
  - Quantidade total de refeições dentro da dieta
  - Quantidaed total de refeições fora da dieta
  - Melhor sequencia de refeições dentro da dieta
- [ ] O usuário autenticado poderá apenas: visualizar, editar e apagar suas próprias refeições.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Stay in touch

- Twitter - [@ericmesmo](https://twitter.com/ericmesmo)

## License

Nest is [MIT licensed](LICENSE).
