const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;

router.get('/', function(req, res, next) {
    models.breed.findAll({ 
      where: {
        organisationId: req.organisationId
      }
    })
      .then((braeds) => {
        return helpers.finalResponse(200 , braeds, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.breed.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((breeds) => {
      return helpers.finalResponse(200 , breeds, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let breed = {};
  helpers.updateBreed(breed, req.body, req.userFullName)
    .then(breed => models.breed.create(breed))
    .then((breed) => {
      return helpers.finalResponse(200 , breed, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.breed.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(breed => helpers.updateBreed(breed, req.body, req.userFullName))
    .then(breed => models.breed.update(breed, { returning: true, where: { id: req.params.id } }))
    .then((breed) => {
      return helpers.finalResponse(200 , breed, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.breed.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(breed => models.breed.destroy({
        where: {
          id: breed.id
        }
      }))
    .then((breed) => {
      return helpers.finalResponse(200 , { message: 'Breed deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;