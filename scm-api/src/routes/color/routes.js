const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;

router.get('/', function(req, res, next) {
    models.color.findAll({ 
      where: {
        organisationId: req.organisationId
      }
    })
      .then((colors) => {
        return helpers.finalResponse(200 , colors, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.color.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((color) => {
      return helpers.finalResponse(200 , color, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let color = {};
  helpers.updateColor(color, req.body, req.userFullName)
    .then(color => models.color.create(color))
    .then((color) => {
      return helpers.finalResponse(200 , color, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.color.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(color => helpers.updateColor(color, req.body, req.userFullName))
    .then(color => models.color.update(color, { returning: true, where: { id: req.params.id } }))
    .then((color) => {
      return helpers.finalResponse(200 , color, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.color.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(color => models.color.destroy({
        where: {
          id: color.id
        }
      }))
    .then((color) => {
      return helpers.finalResponse(200 , { message: 'Color deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;