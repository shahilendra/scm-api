const sequelize = require("../../db");
const Sequelize = require("sequelize");
const roles = require('./roles');
const menus = require('./menus');
const organisations = require("./organisations");

const menusPermissions = sequelize.define('MenusPermissions', 
    { 
        menuId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: menus,
                key: 'id',
            }
        },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: roles,
                key: 'id',
            }
        },
        canView: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        canAdd: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        canEdit: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        canDelete: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        organisationId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: organisations,
                key: 'id',
            }
        },
        createdBy:  { type: Sequelize.STRING(256), allowNull: false},
        updatedBy:  { type: Sequelize.STRING(256), allowNull: true}
    });
module.exports = menusPermissions