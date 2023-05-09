const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;

router.get('/', function(req, res, next) {
    models.animalBreedingActivity.findAll({ 
      where: {
        organisationId: req.organisationId,
        animalId: req.params.animalId
      },
      order: [
        ['date', 'DESC'],
    ],
    })
      .then((animalBreedingActivity) => {
        return helpers.finalResponse(200 , animalBreedingActivity, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.animalBreedingActivity.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((animalBreedingActivity) => {
      return helpers.finalResponse(200 , animalBreedingActivity, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let animalBreedingActivity = {};
  helpers.updateAnimalBreedingActivity(animalBreedingActivity, req.body, req.userFullName, req.params.animalId)
    .then(animalBreedingActivity => models.animalBreedingActivity.create(animalBreedingActivity))
    .then((animalBreedingActivity) => {
      return helpers.finalResponse(200 , animalBreedingActivity, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.animalBreedingActivity.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalBreedingActivity => helpers.updateAnimalBreedingActivity(animalBreedingActivity, req.body, req.userFullName, req.params.animalId))
    .then(animalBreedingActivity => models.animalBreedingActivity.update(animalBreedingActivity, { returning: true, where: { id: req.params.id } }))
    .then((animalBreedingActivity) => {
      return helpers.finalResponse(200 , animalBreedingActivity, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.animalBreedingActivity.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalBreedingActivity => models.animalBreedingActivity.destroy({
        where: {
          id: animalBreedingActivity.id
        }
      }))
    .then((animalBreedingActivity) => {
      return helpers.finalResponse(200 , { message: 'Animal Breeding Activity deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;