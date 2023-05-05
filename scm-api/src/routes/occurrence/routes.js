const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;

router.get('/', function(req, res, next) {
    models.occurrence.findAll({ 
      where: {
        organisationId: req.organisationId
      }
    })
      .then((occurrences) => {
        return helpers.finalResponse(200 , occurrences, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.occurrence.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((occurrence) => {
      return helpers.finalResponse(200 , occurrence, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let occurrence = {};
  helpers.updateColor(occurrence, req.body, req.userFullName)
    .then(occurrence => models.occurrence.create(occurrence))
    .then((occurrence) => {
      return helpers.finalResponse(200 , occurrence, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.occurrence.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(occurrence => helpers.updateColor(occurrence, req.body, req.userFullName))
    .then(occurrence => models.occurrence.update(occurrence, { returning: true, where: { id: req.params.id } }))
    .then((occurrence) => {
      return helpers.finalResponse(200 , occurrence, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.occurrence.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(color => models.occurrence.destroy({
        where: {
          id: color.id
        }
      }))
    .then((occurrence) => {
      return helpers.finalResponse(200 , { message: 'Occurrence deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;