module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: "agenda",
      user: "root",
      password: ""
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
};
