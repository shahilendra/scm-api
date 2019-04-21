const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;


/* GET organisations listing. */
router.get('/', function(req, res, next) {
    models.organisations.findAll()
      .then((organisations) => {
        return helpers.finalResponse(200 , organisations, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.organisations.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((organisation) => {
      return helpers.finalResponse(200 , organisation, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* add new organisation. */
router.post('/', function(req, res, next) {
  let organisation = {};
  helpers.updateOrganisation(organisation, req.body, req.userFullName)
    .then(organisation => models.organisations.create(organisation))
    .then((organisation) => {
      return helpers.finalResponse(200 , organisation, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* update organisation by id. */
router.put('/:id', function(req, res, next) {
  models.organisations.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(organisation => helpers.updateOrganisation(organisation, req.body, req.userFullName))
    .then(organisation => models.organisations.update(organisation, { returning: true, where: { id: req.params.id } }))
    .then((organisation) => {
      return helpers.finalResponse(200 , organisation, res);
    })
    .catch((error) => {
      console.log('error : ', error);
      return helpers.finalResponse(error.status , error, res);
    });
});

/* delete organisation by id. */
router.delete('/:id', function(req, res, next) {
  models.organisations.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(organisation => models.organisations.destroy({
        where: {
          id: organisation.id
        }
      }))
    .then((organisation) => {
      return helpers.finalResponse(200 , {message: 'Organisation deleted successfuly!'}, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});
module.exports = router;