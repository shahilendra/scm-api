const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;

router.get('/', function(req, res, next) {
    models.animalBodyScore.findAll({ 
      where: {
        organisationId: req.organisationId,
        animalId: req.params.animalId
      },
      order: [
        ['date', 'DESC'],
    ],
    })
      .then((animalBodyScores) => {
        return helpers.finalResponse(200 , animalBodyScores, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.animalBodyScore.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((animalBodyScore) => {
      return helpers.finalResponse(200 , animalBodyScore, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let animalBodyScore = {};
  helpers.updateAnimalBodyScore(animalBodyScore, req.body, req.userFullName, req.params.animalId)
    .then(animalBodyScore => models.animalBodyScore.create(animalBodyScore))
    .then((animalBodyScore) => {
      return helpers.finalResponse(200 , animalBodyScore, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.animalBodyScore.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalBodyScore => helpers.updateAnimalBodyScore(animalBodyScore, req.body, req.userFullName, req.params.animalId))
    .then(animalBodyScore => models.animalBodyScore.update(animalBodyScore, { returning: true, where: { id: req.params.id } }))
    .then((animalBodyScore) => {
      return helpers.finalResponse(200 , animalBodyScore, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.animalBodyScore.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animalBodyScore => models.animalBodyScore.destroy({
        where: {
          id: animalBodyScore.id
        }
      }))
    .then((animalBodyScore) => {
      return helpers.finalResponse(200 , { message: 'Animal Body Score deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;