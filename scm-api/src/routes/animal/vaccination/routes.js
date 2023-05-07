const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;

router.get('/', function(req, res, next) {
    models.animalVaccination.findAll({ 
      where: {
        organisationId: req.organisationId,
        animalId: req.params.animalId
      },
      order: [
        ['date', 'DESC'],
    ],
    })
      .then((animalVaccination) => {
        return helpers.finalResponse(200 , animalVaccination, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.animalVaccination.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((animalVaccination) => {
      return helpers.finalResponse(200 , animalVaccination, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let animalVaccination = {};
  helpers.updateVaccination(animalVaccination, req.body, req.userFullName, req.params.animalId)
    .then(animalVaccination => models.animalVaccination.create(animalVaccination))
    .then((animalVaccination) => {
      return helpers.finalResponse(200 , animalVaccination, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.animalVaccination.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalVaccination => helpers.updateVaccination(animalVaccination, req.body, req.userFullName, req.params.animalId))
    .then(animalVaccination => models.animalVaccination.update(animalVaccination, { returning: true, where: { id: req.params.id } }))
    .then((animalVaccination) => {
      return helpers.finalResponse(200 , animalVaccination, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.animalVaccination.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalVaccination => models.animalVaccination.destroy({
        where: {
          id: animalVaccination.id
        }
      }))
    .then((animalVaccination) => {
      return helpers.finalResponse(200 , { message: 'Animal Vaccination deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;