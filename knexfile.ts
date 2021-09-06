export default {
  test: {
    client: 'pg',
    connection:
      'postgres://api:development_pass@localhost:5432/user-hobbies-testing',
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds',
    },
  },
  local: {
    client: 'pg',
    connection: 'postgres://api:development_pass@localhost:5432/user-hobbies',
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds',
    },
  },
};
