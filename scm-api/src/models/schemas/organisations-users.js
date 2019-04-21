const sequelize = require("../../db");
const Sequelize = require("sequelize");
const users = require("./users");
const organisations = require("./organisations");

const organisationsUsers = sequelize.define('OrganisationsUsers', 
    { 
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: users,
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
        },
        isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        createdBy:  { type: Sequelize.STRING(256), allowNull: false},
        updatedBy:  { type: Sequelize.STRING(256), allowNull: true}
    });

module.exports = organisationsUsers;