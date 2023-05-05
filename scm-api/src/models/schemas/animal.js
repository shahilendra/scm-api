const sequelize = require("../../db");
const Sequelize = require("sequelize");
const organisations = require("./organisations");

const animal = sequelize.define('Animal', 
    { 
        name: { type: Sequelize.STRING(256), allowNull: true},
        earTag: { type: Sequelize.STRING(20), allowNull: false},
        transponderId: { type: Sequelize.INTEGER, allowNull: true},
        gender: { type: Sequelize.STRING(20), allowNull: false },
        groupId: { type: Sequelize.INTEGER, allowNull: true },
        insurance: { type: Sequelize.STRING(20), allowNull: false },
        breedId: { type: Sequelize.INTEGER, allowNull: true },
        colorId: { type: Sequelize.INTEGER, allowNull: true },
        notes: { type: Sequelize.STRING(256), allowNull: true},
        birthDate: { type: Sequelize.DATE, allowNull: true},
        birthWeight: { type: Sequelize.DOUBLE, allowNull: true},
        horn: { type: Sequelize.STRING(20), allowNull: true },
        blindQuarterCount: { type: Sequelize.INTEGER, allowNull: true },
        damEarTag: { type: Sequelize.STRING(20), allowNull: true},
        sireRegisterId: { type: Sequelize.STRING(20), allowNull: true},
        purchasePrice: { type: Sequelize.DOUBLE, allowNull: true},
        purchaseDate: { type: Sequelize.DATE, allowNull: true},
        purchaseBodyWeight: { type: Sequelize.DOUBLE, allowNull: true},
        calvingTypeId: { type: Sequelize.INTEGER, allowNull: true },
        calvingOperatorId: { type: Sequelize.INTEGER, allowNull: true },
        occurrenceId: { type: Sequelize.INTEGER, allowNull: true },
        locationId: { type: Sequelize.INTEGER, allowNull: true },
        origin: { type: Sequelize.STRING(100), allowNull: true },
        statusDate: { type: Sequelize.DATE, allowNull: true},
        statusId: { type: Sequelize.INTEGER, allowNull: true },
        siblingsTypeId: { type: Sequelize.INTEGER, allowNull: true },
        isTwin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        twinEarTag: { type: Sequelize.STRING(20), allowNull: true},
        isSlaughterhouse: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
        lactationId: { type: Sequelize.INTEGER, allowNull: true },
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
module.exports = animal;