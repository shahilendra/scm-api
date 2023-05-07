const sequelize = require("../../db");
const Sequelize = require("sequelize");
const animal = require("./animal");
const organisations = require("./organisations");

const animalExamination = sequelize.define('AnimalExamination', 
    { 
        date: { type: Sequelize.DATE, allowNull: false},
        examinationType: { type: Sequelize.STRING(50), allowNull: false },
        diagnosis: { type: Sequelize.STRING(256), allowNull: false },
        result: { type: Sequelize.STRING(256), allowNull: true }, 
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
module.exports = animalExamination;