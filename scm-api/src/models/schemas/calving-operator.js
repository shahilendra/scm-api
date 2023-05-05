const sequelize = require("../../db");
const Sequelize = require("sequelize");
const organisations = require("./organisations");

const calvingOperator = sequelize.define('CalvingOperator', 
    { 
        name: { type: Sequelize.STRING(256), allowNull: false}, 
        phone: { type: Sequelize.STRING(10), allowNull: true},
        notes: { type: Sequelize.STRING(256), allowNull: true},
        isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        createdBy:  { type: Sequelize.STRING(256), allowNull: false},
        updatedBy:  { type: Sequelize.STRING(256), allowNull: true},
        organisationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: organisations,
                key: 'id',
            }
        }
    });
module.exports = calvingOperator;