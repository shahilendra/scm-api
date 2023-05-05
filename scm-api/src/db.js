const config = require("./config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.sqlConfig.database, config.sqlConfig.user, config.sqlConfig.password, {
  host: config.sqlConfig.host,
  port: config.sqlConfig.port,
  dialect: config.sqlConfig.dialect,
  dialectOptions: {
    options: {
        encrypt: config.sqlConfig.encrypt,
    }
  },
  pool: config.sqlConfig.pool
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

