const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;

router.get('/', function(req, res, next) {
    models.animalMilkYield.findAll({ 
      where: {
        organisationId: req.organisationId,
        animalId: req.params.animalId
      },
      order: [
        ['date', 'DESC'],
    ],
    })
      .then((animalMilkYields) => {
        return helpers.finalResponse(200 , animalMilkYields, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.animalMilkYield.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((animalMilkYield) => {
      return helpers.finalResponse(200 , animalMilkYield, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let animalMilkYield = {};
  helpers.updateAnimalMilkYield(animalMilkYield, req.body, req.userFullName, req.params.animalId)
    .then(animalMilkYield => models.animalMilkYield.create(animalMilkYield))
    .then((animalMilkYield) => {
      return helpers.finalResponse(200 , animalMilkYield, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.animalMilkYield.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalMilkYield => helpers.updateAnimalMilkYield(animalMilkYield, req.body, req.userFullName, req.params.animalId))
    .then(animalMilkYield => models.animalMilkYield.update(animalMilkYield, { returning: true, where: { id: req.params.id } }))
    .then((animalMilkYield) => {
      return helpers.finalResponse(200 , animalMilkYield, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.animalMilkYield.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalMilkYield => models.animalMilkYield.destroy({
        where: {
          id: animalMilkYield.id
        }
      }))
    .then((animalMilkYield) => {
      return helpers.finalResponse(200 , { message: 'Animal Milk Yield deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;