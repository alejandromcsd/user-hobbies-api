# Production-ready NestJS/Typescript/Postgres/Docker

## Use cases

The backend API supports the following use cases:

1. Users can create records with an e-mail and password.
2. Users can change their e-mail address and password.
3. A user's password is validated to be at least 8 characters long.
4. Users is able to remove themselves from the application.
5. Users is able to add hobbies. A hobby has a name and a description.
6. Users is able to change the name and description of their hobbies.
7. Users is able to see a list of their hobbies.

## Technical details

1. Uses NodeJS
2. Uses Typescript
3. Uses NestJS
4. Uses Postgres with Knex.js
5. Boilerplate Jest + NestJS unit tests
6. Endpoints documented with Swagger

## Installation

```bash
$ npm install
```

## Setting up postgres (via Docker)

```bash
# development
$ docker-compose up

# run db migrations to create tables
$ npm run db:migrate:run
```

## Running node app

```bash
# development
$ npm run start:debug
```

## Test

```bash
# unit tests
$ npm run test
```

## Open items - to be improved in real scenario

- Password hashing on user creation.
- **Authentication**: not part of the use cases covered. For authentication, in real-scenario, we might want to look into an strategy that works well with NestJS. For instance an auth service/module like Passport + bearer tokens (JWT).
- **Authorization**: app illustrates a basic authZ logic for update hobbies (must be same user). For restricting access to records/resources, we could exlore something like CASL: https://docs.nestjs.com/security/authorization#integrating-casl
- Logging and configuration.
- Unit tests and e2e tests: app includes basic unit tests for controllers and services. In real scenario, increase coverage to 100%. Also, resolve challenges when writing unit tests for Knex (mocking vs. using real testing db + migrations).
