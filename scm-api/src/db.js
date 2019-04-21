const config = require("./config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.sqlConfig.database, config.sqlConfig.user, config.sqlConfig.password, {
  host: config.sqlConfig.host,
  dialect: config.sqlConfig.dialect,
  dialectOptions: {
    port: config.sqlConfig.port
  }
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

