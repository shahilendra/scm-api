const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;
const sequelize = require("../../db");

router.get('/', function(req, res, next) {
  return sequelize.query(`EXEC sp_GetAnimals :orgId`,
        { replacements: { orgId: req.organisationId }, type: sequelize.QueryTypes.SELECT }
      )
    .then((animals) => {
      return helpers.finalResponse(200 , animals, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});
router.get('/:id', function(req, res, next) {
  models.animal.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((animal) => {
      return helpers.finalResponse(200 , animal, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let animal = {};
  helpers.updateAnimal(animal, req.body, req.userFullName)
    .then(animal => models.animal.create(animal))
    .then((animal) => {
      return helpers.finalResponse(200 , animal, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.animal.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animal => helpers.updateAnimal(animal, req.body, req.userFullName))
    .then(animal => models.animal.update(animal, { returning: true, where: { id: req.params.id } }))
    .then((animal) => {
      return helpers.finalResponse(200 , animal, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.animal.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(animal => models.animal.destroy({
        where: {
          id: animal.id
        }
      }))
    .then((animal) => {
      return helpers.finalResponse(200 , { message: 'Animal deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.get('/:id/profiles', function(req, res, next) {
  return sequelize.query(`EXEC sp_GetAnimal :orgId, :animalId`,
        { replacements: { orgId: req.organisationId, animalId: parseInt(req.params.id)}, type: sequelize.QueryTypes.SELECT }
      )
    .then((animal) => {
      return helpers.finalResponse(200 , animal[0], res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});
router.use('/:animalId/transactions', require('./transaction'));  //tested
router.use('/:animalId/notes', require('./note'));  //tested
router.use('/:animalId/inseminations', require('./insemination'));  //tested

router.use('/:animalId/body-scores', require('./body-score'));  //tested
router.use('/:animalId/lactations', require('./lactation'));  //tested
router.use('/:animalId/locations', require('./location'));  //tested
router.use('/:animalId/milk-yields', require('./milk-yield'));  //tested
router.use('/:animalId/weights', require('./weight'));  //tested
router.use('/:animalId/groups', require('./group'));  //tested
router.use('/:animalId/vaccinations', require('./vaccination'));  //tested
router.use('/:animalId/examinations', require('./examination'));  //tested
router.use('/:animalId/breedings', require('./breeding'));  //tested
router.use('/:animalId/pregnancies', require('./pregnancy'));  //tested

module.exports = router;