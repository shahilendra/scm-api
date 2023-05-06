const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;
const sequelize = require("../../../db");

router.get('/', function(req, res, next) {
       return sequelize.query(`SELECT al.id, al.locationId, al.startDate, al.endDate, l.name from AnimalLocations al INNER JOIN Locations l on al.locationId=l.id
    where al.animalId = :animalId AND al.organisationId = :orgId AND al.isActive = 1 ORDER BY startDate DESC`,
        { replacements: { animalId: req.params.animalId, orgId: req.organisationId }, type: sequelize.QueryTypes.SELECT }
      )
      .then((animalLocations) => {
        return helpers.finalResponse(200 , animalLocations, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.animalLocation.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((animalLocation) => {
      return helpers.finalResponse(200 , animalLocation, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let animalLocation = {};
  helpers.updateAnimalLocation(animalLocation, req.body, req.userFullName, req.params.animalId)
    .then(animalLocation => models.animalLocation.create(animalLocation))
    .then((animalLocation) => {
      return helpers.finalResponse(200 , animalLocation, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.animalLocation.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalLocation => helpers.updateAnimalLocation(animalLocation, req.body, req.userFullName, req.params.animalId))
    .then(animalLocation => models.insemination.update(animalLocation, { returning: true, where: { id: req.params.id } }))
    .then((animalLocation) => {
      return helpers.finalResponse(200 , animalLocation, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.animalLocation.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalLocation => models.animalLocation.destroy({
        where: {
          id: animalLocation.id
        }
      }))
    .then((animalLocation) => {
      return helpers.finalResponse(200 , { message: 'Animal Location deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});


module.exports = router;