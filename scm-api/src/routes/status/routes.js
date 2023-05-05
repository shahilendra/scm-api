const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;

router.get('/', function(req, res, next) {
    models.status.findAll({ 
      where: {
        organisationId: req.organisationId
      }
    })
      .then((status) => {
        return helpers.finalResponse(200 , status, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.status.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((status) => {
      return helpers.finalResponse(200 , status, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let status = {};
  helpers.updateColor(status, req.body, req.userFullName)
    .then(status => models.status.create(status))
    .then((status) => {
      return helpers.finalResponse(200 , status, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.status.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(status => helpers.updateColor(status, req.body, req.userFullName))
    .then(status => models.status.update(status, { returning: true, where: { id: req.params.id } }))
    .then((status) => {
      return helpers.finalResponse(200 , status, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.status.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(color => models.status.destroy({
        where: {
          id: color.id
        }
      }))
    .then((status) => {
      return helpers.finalResponse(200 , { message: 'status deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;