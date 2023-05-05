const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;
const sequelize = require("../../../db");

router.get('/', function(req, res, next) {
    return sequelize.query(`SELECT ag.id, ag.groupId, g.name from AnimalGroups ag INNER JOIN Groups g on ag.groupId=g.id
    where ag.animalId = :animalId AND ag.organisationId = :orgId AND ag.isActive = 1`,
        { replacements: { animalId: req.params.animalId, orgId: req.organisationId }, type: sequelize.QueryTypes.SELECT }
      )
      .then((animalGroups) => {
        return helpers.finalResponse(200 , animalGroups, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.animalGroup.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((animalGroup) => {
      return helpers.finalResponse(200 , animalGroup, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let animalGroup = {};
  helpers.updateAnimalGruop(animalGroup, req.body, req.userFullName, req.params.animalId)
    .then(animalGroup => models.animalGroup.create(animalGroup))
    .then((animalGroup) => {
      return helpers.finalResponse(200 , animalGroup, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.animalGroup.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalGroup => helpers.updateAnimalGruop(animalGroup, req.body, req.userFullName, req.params.animalId))
    .then(animalGroup => models.insemination.update(animalGroup, { returning: true, where: { id: req.params.id } }))
    .then((animalGroup) => {
      return helpers.finalResponse(200 , animalGroup, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.animalGroup.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalGroup => models.animalGroup.destroy({
        where: {
          id: animalGroup.id
        }
      }))
    .then((animalGroup) => {
      return helpers.finalResponse(200 , { message: 'Animal Group deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});


module.exports = router;