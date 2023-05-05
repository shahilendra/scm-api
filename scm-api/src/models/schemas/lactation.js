const sequelize = require("../../db");
const Sequelize = require("sequelize");
const animal = require("./animal");
const organisations = require("./organisations");

const lactation = sequelize.define('Lactation', 
    { 
        startDate: { type: Sequelize.DATE, allowNull: false},
        endDate: { type: Sequelize.DATE, allowNull: true},
        milkYield: { type: Sequelize.DECIMAL, allowNull: true},
        lactationNo: { type: Sequelize.DECIMAL, allowNull: false},
        isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        createdBy:  { type: Sequelize.STRING(256), allowNull: false},
        updatedBy:  { type: Sequelize.STRING(256), allowNull: true},
        animalId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: animal,
                key: 'id',
            }
        },
        organisationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: organisations,
                key: 'id',
            }
        }
    });
module.exports = lactation;