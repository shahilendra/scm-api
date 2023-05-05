const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;

router.get('/', function(req, res, next) {
    models.lactation.findAll({ 
      where: {
        organisationId: req.organisationId,
        animalId: req.params.animalId
      },
      order: [
        ['updatedAt', 'DESC'],
    ],
    })
      .then((lactations) => {
        return helpers.finalResponse(200 , lactations, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.lactation.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((lactation) => {
      return helpers.finalResponse(200 , lactation, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let lactation = {};
  helpers.updateLactation(lactation, req.body, req.userFullName, req.params.animalId)
    .then(lactation => models.lactation.create(lactation))
    .then((lactation) => {
      return helpers.finalResponse(200 , lactation, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.lactation.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(lactation => helpers.updateLactation(lactation, req.body, req.userFullName, req.params.animalId))
    .then(lactation => models.lactation.update(lactation, { returning: true, where: { id: req.params.id } }))
    .then((lactation) => {
      return helpers.finalResponse(200 , lactation, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.lactation.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(lactation => models.lactation.destroy({
        where: {
          id: lactation.id
        }
      }))
    .then((lactation) => {
      return helpers.finalResponse(200 , { message: 'lactation deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;