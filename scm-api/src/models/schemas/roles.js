const sequelize = require("../../db");
const Sequelize = require("sequelize");

const roles = sequelize.define('Roles', 
    { 
        name: { type: Sequelize.STRING(256), allowNull: false}, 
        descriptions: { type: Sequelize.STRING(500), allowNull: false},
        isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        createdBy:  { type: Sequelize.STRING(256), allowNull: false},
        updatedBy:  { type: Sequelize.STRING(256), allowNull: true}
    });
module.exports = roles;