const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;

router.get('/', function(req, res, next) {
    models.siblingsType.findAll({ 
      where: {
        organisationId: req.organisationId
      }
    })
      .then((siblingsTypes) => {
        return helpers.finalResponse(200 , siblingsTypes, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.siblingsType.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((siblingsType) => {
      return helpers.finalResponse(200 , siblingsType, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let siblingsType = {};
  helpers.updateColor(siblingsType, req.body, req.userFullName)
    .then(siblingsType => models.siblingsType.create(siblingsType))
    .then((siblingsType) => {
      return helpers.finalResponse(200 , siblingsType, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.siblingsType.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(siblingsType => helpers.updateColor(siblingsType, req.body, req.userFullName))
    .then(siblingsType => models.siblingsType.update(siblingsType, { returning: true, where: { id: req.params.id } }))
    .then((siblingsType) => {
      return helpers.finalResponse(200 , siblingsType, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.siblingsType.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(color => models.siblingsType.destroy({
        where: {
          id: color.id
        }
      }))
    .then((siblingsType) => {
      return helpers.finalResponse(200 , { message: 'SiblingsType deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;