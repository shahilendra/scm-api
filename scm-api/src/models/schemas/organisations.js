const sequelize = require("../../db");
const Sequelize = require("sequelize");
const users = require("./users");

const organisations = sequelize.define('Organisations', 
    { 
        name: { type: Sequelize.STRING(256), allowNull: false, unique: true }, 
        descriptions: { type: Sequelize.STRING(500), allowNull: false},
        isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        details: Sequelize.STRING(1000),
        createdBy:  { type: Sequelize.STRING(256), allowNull: false},
        updatedBy:  { type: Sequelize.STRING(256), allowNull: true}
    });

module.exports = organisations;
