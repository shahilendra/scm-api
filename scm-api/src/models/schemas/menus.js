const sequelize = require("../../db");
const Sequelize = require("sequelize");

const menus = sequelize.define('Menus', 
    { 
        title: { type: Sequelize.STRING(256), allowNull: false}, 
        menuId: { type: Sequelize.STRING(256), allowNull: false},
        type: { type: Sequelize.STRING(256), allowNull: true},
        icon: { type: Sequelize.STRING(256), allowNull: true},
        url:  { type: Sequelize.STRING(1000), allowNull: true},
        isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        createdBy:  { type: Sequelize.STRING(256), allowNull: false},
        updatedBy:  { type: Sequelize.STRING(256), allowNull: true},
        parentId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        displayOrder: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });
module.exports = menus;