const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;

router.get('/', function(req, res, next) {
    models.calvingOperator.findAll({ 
      where: {
        organisationId: req.organisationId
      }
    })
      .then((calvingOperators) => {
        return helpers.finalResponse(200 , calvingOperators, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.calvingOperator.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((calvingOperator) => {
      return helpers.finalResponse(200 , calvingOperator, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let calvingOperator = {};
  helpers.updateCalvingOperator(calvingOperator, req.body, req.userFullName)
    .then(calvingOperator => models.calvingOperator.create(calvingOperator))
    .then((calvingOperator) => {
      return helpers.finalResponse(200 , calvingOperator, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.calvingOperator.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(calvingOperator => helpers.updateCalvingOperator(calvingOperator, req.body, req.userFullName))
    .then(calvingOperator => models.calvingOperator.update(calvingOperator, { returning: true, where: { id: req.params.id } }))
    .then((calvingOperator) => {
      return helpers.finalResponse(200 , calvingOperator, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.calvingOperator.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(calvingOperator => models.calvingOperator.destroy({
        where: {
          id: calvingOperator.id
        }
      }))
    .then((calvingOperator) => {
      return helpers.finalResponse(200 , { message: 'CalvingOperator deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;