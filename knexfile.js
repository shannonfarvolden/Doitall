const sharedConfig = { //common properties shared by object elements.
  client: 'postgresql',
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  }
}

module.exports = {

  development: {
    ...sharedConfig,
    connection: {
      database: 'doitall_dev'
    }
  },

  staging: {
    ...sharedConfig,
    connection: {
      database: 'doitall_staging'
    }
  },

  production: {
    ...sharedConfig,
    connection: {
      database: 'doitall_production'
    }
  }

};
