const sequelize = require("../../db");
const Sequelize = require("sequelize");
const organisations = require('./organisations');
const users = require('./users');

const supportQuery = sequelize.define('SupportQuery', 
    { 
        name: { type: Sequelize.STRING(256), allowNull: false}, 
        email: { type: Sequelize.STRING(256), allowNull: false },
        phone: Sequelize.STRING(15),
        city: Sequelize.STRING(256),
        message: Sequelize.STRING(1000),
        parantMessageId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: users,
                key: 'id',
            }
        },
        status: {
            type:   Sequelize.ENUM,
            values: ['Requested', 'Open', 'Assigned', 'InProgress', 'Pending','Rosolved', 'Closed'],
            default: 'Requested',
        },
        organisationId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: organisations,
                key: 'id',
            }
        },
        isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
    });
module.exports = supportQuery;
