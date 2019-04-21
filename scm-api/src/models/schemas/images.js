const sequelize = require("../../db");
const Sequelize = require("sequelize");
const users = require('./users');

const images = sequelize.define('Images', 
    { 
        fieldName: { type: Sequelize.STRING(500), allowNull: false}, 
        originalName: { type: Sequelize.STRING(500), allowNull: false},
        encoding: { type: Sequelize.STRING(256), allowNull: false},
        mimeType: { type: Sequelize.STRING(256), allowNull: false},
        size: Sequelize.INTEGER,
        destination: Sequelize.STRING(500),
        fileName: Sequelize.STRING(500),
        path: Sequelize.STRING(1000),
        imageURL: Sequelize.STRING(1000),
        isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: users,
                key: 'id',
            }
        }
    });
module.exports = images;