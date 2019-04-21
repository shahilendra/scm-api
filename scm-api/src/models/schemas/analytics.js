const sequelize = require("../../db");
const Sequelize = require("sequelize");
const users = require('./users');
const analytics = sequelize.define('Analytics', 
    { 
        name: { type: Sequelize.STRING(256), allowNull: false}, 
        version: { type: Sequelize.STRING(256), allowNull: false},
        versionNumber: { type: Sequelize.STRING(256), allowNull: false},
        mobile: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
        os: { type: Sequelize.STRING(256), allowNull: false},
        clientIp: { type: Sequelize.STRING(256), allowNull: false},
        clientIpRoutable: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
        url: { type: Sequelize.STRING(1000), allowNull: false},
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: users,
                key: 'id',
            }
        },
        createdBy:  { type: Sequelize.STRING(256), allowNull: false}
    });
module.exports = analytics;