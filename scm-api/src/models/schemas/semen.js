const sequelize = require("../../db");
const Sequelize = require("sequelize");
const organisations = require("./organisations");
const breed = require("./breed");

const semen = sequelize.define('Semen', 
    { 
        name: { type: Sequelize.STRING(256), allowNull: false}, 
        breedId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: breed,
                key: 'id',
            }
        },
        semenNo: { type: Sequelize.STRING(20), allowNull: true},
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
module.exports = semen;