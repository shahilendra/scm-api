const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;

router.get('/', function(req, res, next) {
    models.semen.findAll({ 
      where: {
        organisationId: req.organisationId
      }
    })
      .then((semens) => {
        return helpers.finalResponse(200 , semens, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.semen.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((semen) => {
      return helpers.finalResponse(200 , semen, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let semen = {};
  helpers.updateSemen(semen, req.body, req.userFullName)
    .then(semen => models.semen.create(semen))
    .then((semen) => {
      return helpers.finalResponse(200 , semen, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.semen.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(semen => helpers.updateSemen(semen, req.body, req.userFullName))
    .then(semen => models.semen.update(semen, { returning: true, where: { id: req.params.id } }))
    .then((semen) => {
      return helpers.finalResponse(200 , semen, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.semen.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(semen => models.semen.destroy({
        where: {
          id: semen.id
        }
      }))
    .then((semen) => {
      return helpers.finalResponse(200 , { message: 'Semen deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;