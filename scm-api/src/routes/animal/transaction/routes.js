const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;

router.get('/', function(req, res, next) {
    models.transaction.findAll({ 
      where: {
        organisationId: req.organisationId,
        animalId: req.params.animalId
      },
      order: [
        ['date', 'DESC'],
        ['time', 'DESC'],
    ],
    })
      .then((transactions) => {
        return helpers.finalResponse(200 , transactions, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.transaction.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((transaction) => {
      return helpers.finalResponse(200 , transaction, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let transaction = {};
  helpers.updateTransaction(transaction, req.body, req.userFullName, req.params.animalId)
    .then(transaction => models.transaction.create(transaction))
    .then((transaction) => {
      return helpers.finalResponse(200 , transaction, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.transaction.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(transaction => helpers.updateTransaction(transaction, req.body, req.userFullName, req.params.animalId))
    .then(transaction => models.transaction.update(transaction, { returning: true, where: { id: req.params.id } }))
    .then((transaction) => {
      return helpers.finalResponse(200 , transaction, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.transaction.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(transaction => models.transaction.destroy({
        where: {
          id: transaction.id
        }
      }))
    .then((transaction) => {
      return helpers.finalResponse(200 , { message: 'Transaction deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;