const sequelize = require("../../db");
const Sequelize = require("sequelize");
const organisations = require("./organisations");

const occurrence = sequelize.define('Occurrence', 
    { 
        name: { type: Sequelize.STRING(256), allowNull: false}, 
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
module.exports = occurrence;