const sequelize = require("../../db");
const Sequelize = require("sequelize");
const roles = require('./roles');

const users = sequelize.define('Users', 
    { 
        firstName: { type: Sequelize.STRING(256), allowNull: false}, 
        lastName: { type: Sequelize.STRING(256), allowNull: false},
        email: { type: Sequelize.STRING(256), allowNull: false, unique: true },
        password: { type: Sequelize.STRING(100), allowNull: false, select: false },
        phone: Sequelize.STRING(15),
        age: Sequelize.INTEGER,
        gender: {
            type:   Sequelize.ENUM,
            values: ['Male','Female', 'Others'],
            allowNull: false,
            defaultValue: 'Others'
        },
        isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: roles,
                key: 'id',
            }
        },
        details: Sequelize.STRING(1000),
        activationCode: { type: Sequelize.STRING(100), allowNull: false }

    });
module.exports = users;