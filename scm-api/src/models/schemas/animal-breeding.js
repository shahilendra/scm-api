const sequelize = require("../../db");
const Sequelize = require("sequelize");
const animal = require("./animal");
const organisations = require("./organisations");

const animalBreedingActivity = sequelize.define('AnimalBreedingActivity', 
    { 
        date: { type: Sequelize.DATE, allowNull: false},
        diagnosisType: { type: Sequelize.STRING(50), allowNull: false },
        time: { type: Sequelize.STRING(10), allowNull: false },
        activityType: { type: Sequelize.STRING(50), allowNull: true }, 
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
module.exports = animalBreedingActivity;