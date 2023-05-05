const sequelize = require("../../db");
const Sequelize = require("sequelize");
const animal = require("./animal");
const organisations = require("./organisations");

const animalMilkYield = sequelize.define('AnimalMilkYield', 
    { 
        date: { type: Sequelize.DATE, allowNull: false},
        time: { type: Sequelize.TIME, allowNull: true},
        milkYield: { type: Sequelize.DOUBLE, allowNull: false},
        milkingTime: { type: Sequelize.STRING(20), allowNull: false }, 
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
module.exports = animalMilkYield;