// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgresql://postgres:postgres@localhost:5432/my_town_new'
  },

  production: {
    client: 'postgresql',
    connection: process.env.MY_TOWN_API_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/my_town_prod',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
