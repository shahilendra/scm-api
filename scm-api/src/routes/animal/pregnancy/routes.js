const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;

router.get('/', function(req, res, next) {
    models.animalPregnancy.findAll({ 
      where: {
        organisationId: req.organisationId,
        animalId: req.params.animalId
      },
      order: [
        ['date', 'DESC'],
    ],
    })
      .then((animalPregnancy) => {
        return helpers.finalResponse(200 , animalPregnancy, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.animalPregnancy.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((animalPregnancy) => {
      return helpers.finalResponse(200 , animalPregnancy, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let animalPregnancy = {};
  helpers.updateAnimalPregnancy(animalPregnancy, req.body, req.userFullName, req.params.animalId)
    .then(animalPregnancy => models.animalPregnancy.create(animalPregnancy))
    .then((animalPregnancy) => {
      return helpers.finalResponse(200 , animalPregnancy, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.animalPregnancy.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalPregnancy => helpers.updateAnimalPregnancy(animalPregnancy, req.body, req.userFullName, req.params.animalId))
    .then(animalPregnancy => models.animalPregnancy.update(animalPregnancy, { returning: true, where: { id: req.params.id } }))
    .then((animalPregnancy) => {
      return helpers.finalResponse(200 , animalPregnancy, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.animalPregnancy.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalPregnancy => models.animalPregnancy.destroy({
        where: {
          id: animalPregnancy.id
        }
      }))
    .then((animalPregnancy) => {
      return helpers.finalResponse(200 , { message: 'Animal Pregnancy deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;