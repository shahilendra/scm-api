const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;

/* GET supportQuery listing. */
router.get('/', function(req, res, next) {
  models.supportQuery.findAll()
    .then((supportQuerys) => {
      return helpers.finalResponse(200 , supportQuerys, res);
    })
    .catch((error) => {
      return helpers.finalResponse(500 , error, res);
    });
});


router.get('/:id', function(req, res, next) {
  models.supportQuery.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((supportQuery) => {
      return helpers.finalResponse(200 , supportQuery, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* add new supportQuery. */
router.post('/', function(req, res, next) {
  let supportQuery = {};
  helpers.updateSupportQuery(supportQuery, req.body, req.userFullName)
    .then(query => models.supportQuery.create(query))
    .then((query) => {
      return helpers.finalResponse(200 , query, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* update supportQuery by id. */
router.put('/:id', function(req, res, next) {
  models.supportQuery.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(query => helpers.updateSupportQuery(query, req.body, req.userFullName))
    .then(query => models.supportQuery.update(query, { 
      where: {
        id: req.params.id
      }
    }))
    .then((query) => {
      return helpers.finalResponse(200 , query, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* delete supportQuery by id. */
router.delete('/:id', function(req, res, next) {
  models.supportQuery.findOne({
       where: {
          id: req.params.id
       }
    })
    .then(query => models.supportQuery.destroy({
       where: {
          id: query.id
       }
    }))
    .then((query) => {
      return helpers.finalResponse(200 , {message: 'supportQuery deleted successfuly!'}, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;