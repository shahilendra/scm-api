const sequelize = require("../../db");
const Sequelize = require("sequelize");
const animal = require("./animal");
const organisations = require("./organisations");

const insemination = sequelize.define('Insemination', 
    { 
        date: { type: Sequelize.DATE, allowNull: false},
        time: { type: Sequelize.TIME, allowNull: false},
        examinationDate: { type: Sequelize.DATE, allowNull: false},
        price: { type: Sequelize.DECIMAL, allowNull: true},
        staff: { type: Sequelize.STRING(256), allowNull: true},
        methodId: { type: Sequelize.STRING(256), allowNull: true},
        detectionTypeId: { type: Sequelize.STRING(256), allowNull: true},
        bullEarTag: { type: Sequelize.STRING(20), allowNull: true},
        spermaNo: { type: Sequelize.STRING(20), allowNull: true},
        notes: { type: Sequelize.STRING(256), allowNull: true}, 
        isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        createdBy:  { type: Sequelize.STRING(256), allowNull: false},
        updatedBy:  { type: Sequelize.STRING(256), allowNull: true},
        status: { type: Sequelize.STRING(20), allowNull: true},
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
module.exports = insemination;