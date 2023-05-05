const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;


/* GET roles listing. */
router.get('/', function(req, res, next) {
    models.calvingType.findAll({ 
      where: {
        organisationId: req.organisationId
      }
    })
      .then((calvingTypes) => {
        return helpers.finalResponse(200 , calvingTypes, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.calvingType.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((calvingType) => {
      return helpers.finalResponse(200 , calvingType, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* add new calvingType. */
router.post('/', function(req, res, next) {
  let calvingType = {};
  helpers.updateCalvingType(calvingType, req.body, req.userFullName)
    .then(calvingType => models.calvingType.create(calvingType))
    .then((calvingType) => {
      return helpers.finalResponse(200 , calvingType, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* update calvingType by id. */
router.put('/:id', function(req, res, next) {
  models.calvingType.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(calvingType => helpers.updateCalvingType(calvingType, req.body, req.userFullName))
    .then(calvingType => models.calvingType.update(calvingType, { returning: true, where: { id: req.params.id } }))
    .then((calvingType) => {
      return helpers.finalResponse(200 , calvingType, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* delete calvingType by id. */
router.delete('/:id', function(req, res, next) {
  models.calvingType.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(calvingType => models.calvingType.destroy({
        where: {
          id: calvingType.id
        }
      }))
    .then((calvingType) => {
      return helpers.finalResponse(200 , { message: 'CalvingType deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;