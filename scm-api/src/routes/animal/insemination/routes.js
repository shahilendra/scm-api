const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;

router.get('/', function(req, res, next) {
    models.insemination.findAll({ 
      where: {
        organisationId: req.organisationId,
        animalId: req.params.animalId
      },
      order: [
        ['updatedAt', 'DESC'],
    ],
    })
      .then((inseminations) => {
        return helpers.finalResponse(200 , inseminations, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.insemination.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((insemination) => {
      return helpers.finalResponse(200 , insemination, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let insemination = {};
  helpers.updateInsemination(insemination, req.body, req.userFullName, req.params.animalId)
    .then(insemination => models.insemination.create(insemination))
    .then((insemination) => {
      return helpers.finalResponse(200 , insemination, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.insemination.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(insemination => helpers.updateInsemination(insemination, req.body, req.userFullName, req.params.animalId))
    .then(insemination => models.insemination.update(insemination, { returning: true, where: { id: req.params.id } }))
    .then((insemination) => {
      return helpers.finalResponse(200 , insemination, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.insemination.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(insemination => models.insemination.destroy({
        where: {
          id: insemination.id
        }
      }))
    .then((insemination) => {
      return helpers.finalResponse(200 , { message: 'Insemination deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id/status', function(req, res, next) {
  models.insemination.findOne({ 
      where: {
        id: req.params.id
      }
    })
    //.then(insemination => helpers.updateInsemination(insemination, req.body, req.userFullName, req.params.animalId))
    .then(insemination => models.insemination.update({status: req.body.status}, { returning: true, where: { id: req.params.id } }))
    .then((insemination) => {
      return helpers.finalResponse(200 , insemination, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;