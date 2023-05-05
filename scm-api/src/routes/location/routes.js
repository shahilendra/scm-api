const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;

router.get('/', function(req, res, next) {
    models.location.findAll({ 
      where: {
        organisationId: req.organisationId
      }
    })
      .then((locations) => {
        return helpers.finalResponse(200 , locations, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.location.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((location) => {
      return helpers.finalResponse(200 , location, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let location = {};
  helpers.updateColor(location, req.body, req.userFullName)
    .then(location => models.location.create(location))
    .then((location) => {
      return helpers.finalResponse(200 , location, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.location.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(location => helpers.updateColor(location, req.body, req.userFullName))
    .then(location => models.location.update(location, { returning: true, where: { id: req.params.id } }))
    .then((location) => {
      return helpers.finalResponse(200 , location, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.location.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(location => models.location.destroy({
        where: {
          id: location.id
        }
      }))
    .then((location) => {
      return helpers.finalResponse(200 , { message: 'Location deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;