const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;


/* GET organisationsUsers listing. */
router.get('/', function(req, res, next) {
    models.organisationsUsers.findAll()
      .then((items) => {
        return helpers.finalResponse(200 , items, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.organisationsUsers.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((item) => {
      return helpers.finalResponse(200 , item, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* add new organisationsUsers */
router.post('/', function(req, res, next) {
  let item = {};
  helpers.updateOrganisationsUser(item, req.body, req.userFullName)
    .then(item => models.organisationsUsers.create(item))
    .then((item) => {
      return helpers.finalResponse(200 , item, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* update organisationsUsers by id. */
router.put('/:id', function(req, res, next) {
  models.organisationsUsers.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(item => helpers.updateOrganisationsUser(item, req.body, req.userFullName))
    .then(item => models.organisationsUsers.update(item, { returning: true, where: { id: req.params.id } }))
    .then((item) => {
      return helpers.finalResponse(200 , item, res);
    })
    .catch((error) => {
      console.log('error : ', error);
      return helpers.finalResponse(error.status , error, res);
    });
});

/* delete organisationsUsers by id. */
router.delete('/:id', function(req, res, next) {
  models.organisationsUsers.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(item => models.organisationsUsers.destroy({
        where: {
          id: item.id
        }
      }))
    .then((item) => {
      return helpers.finalResponse(200 , { message: 'OrganisationsUsers deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;