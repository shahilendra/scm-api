const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;

router.get('/', function(req, res, next) {
    models.animalExamination.findAll({ 
      where: {
        organisationId: req.organisationId,
        animalId: req.params.animalId
      },
      order: [
        ['date', 'DESC'],
    ],
    })
      .then((animalExaminations) => {
        return helpers.finalResponse(200 , animalExaminations, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.animalExamination.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((animalExamination) => {
      return helpers.finalResponse(200 , animalExamination, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let animalExamination = {};
  helpers.updateAnimalExamination(animalExamination, req.body, req.userFullName, req.params.animalId)
    .then(animalExamination => models.animalExamination.create(animalExamination))
    .then((animalExamination) => {
      return helpers.finalResponse(200 , animalExamination, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.animalExamination.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalExamination => helpers.updateAnimalExamination(animalExamination, req.body, req.userFullName, req.params.animalId))
    .then(animalExamination => models.animalExamination.update(animalExamination, { returning: true, where: { id: req.params.id } }))
    .then((animalExamination) => {
      return helpers.finalResponse(200 , animalExamination, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.animalExamination.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalExamination => models.animalExamination.destroy({
        where: {
          id: animalExamination.id
        }
      }))
    .then((animalExamination) => {
      return helpers.finalResponse(200 , { message: 'Animal Examination Milk Yield deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;