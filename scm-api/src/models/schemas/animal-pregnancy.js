const sequelize = require("../../db");
const Sequelize = require("sequelize");
const animal = require("./animal");
const organisations = require("./organisations");

const animalPregnancy = sequelize.define('AnimalPregnancy', 
    { 
        date: { type: Sequelize.DATE, allowNull: false},
        status: { type: Sequelize.STRING(50), allowNull: false },
        time: { type: Sequelize.STRING(10), allowNull: false },
        veterinarian: { type: Sequelize.STRING(50), allowNull: true },
        veterinarianPhone: { type: Sequelize.STRING(50), allowNull: true },
        notes: { type: Sequelize.STRING(250), allowNull: true }, 
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
module.exports = animalPregnancy;