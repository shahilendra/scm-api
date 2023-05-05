const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;

router.get('/', function(req, res, next) {
    models.animalWeight.findAll({ 
      where: {
        organisationId: req.organisationId,
        animalId: req.params.animalId
      },
      order: [
        ['updatedAt', 'DESC'],
    ],
    })
      .then((animalWeights) => {
        return helpers.finalResponse(200 , animalWeights, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.animalWeight.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((animalWeight) => {
      return helpers.finalResponse(200 , animalWeight, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let animalWeight = {};
  helpers.updateAnimalWeight(animalWeight, req.body, req.userFullName, req.params.animalId)
    .then(animalWeight => models.animalWeight.create(animalWeight))
    .then((animalWeight) => {
      return helpers.finalResponse(200 , animalWeight, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.animalWeight.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalWeight => helpers.updateAnimalWeight(animalWeight, req.body, req.userFullName, req.params.animalId))
    .then(animalWeight => models.animalWeight.update(animalWeight, { returning: true, where: { id: req.params.id } }))
    .then((animalWeight) => {
      return helpers.finalResponse(200 , animalWeight, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.animalWeight.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalWeight => models.animalWeight.destroy({
        where: {
          id: animalWeight.id
        }
      }))
    .then((animalWeight) => {
      return helpers.finalResponse(200 , { message: 'Aanimal Weight deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;