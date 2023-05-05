const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;

router.get('/', function(req, res, next) {
    models.group.findAll({ 
      where: {
        organisationId: req.organisationId
      }
    })
      .then((groups) => {
        return helpers.finalResponse(200 , groups, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.group.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((group) => {
      return helpers.finalResponse(200 , group, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let group = {};
  helpers.updateColor(group, req.body, req.userFullName)
    .then(group => models.group.create(group))
    .then((group) => {
      return helpers.finalResponse(200 , group, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.group.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(group => helpers.updateColor(group, req.body, req.userFullName))
    .then(group => models.group.update(group, { returning: true, where: { id: req.params.id } }))
    .then((group) => {
      return helpers.finalResponse(200 , group, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.group.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(group => models.group.destroy({
        where: {
          id: group.id
        }
      }))
    .then((group) => {
      return helpers.finalResponse(200 , { message: 'Group deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;