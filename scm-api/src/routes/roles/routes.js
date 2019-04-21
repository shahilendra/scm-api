const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;


/* GET roles listing. */
router.get('/', function(req, res, next) {
    models.roles.findAll()
      .then((roles) => {
        return helpers.finalResponse(200 , roles, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.roles.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((role) => {
      return helpers.finalResponse(200 , role, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* add new role. */
router.post('/', function(req, res, next) {
  let role = {};
  helpers.updateRole(role, req.body, req.userFullName)
    .then(role => models.roles.create(role))
    .then((role) => {
      return helpers.finalResponse(200 , role, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* update role by id. */
router.put('/:id', function(req, res, next) {
  models.roles.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(role => helpers.updateRole(role, req.body, req.userFullName))
    .then(role => models.roles.update(role, { returning: true, where: { id: req.params.id } }))
    .then((role) => {
      return helpers.finalResponse(200 , role, res);
    })
    .catch((error) => {
      console.log('error : ', error);
      return helpers.finalResponse(error.status , error, res);
    });
});

/* delete role by id. */
router.delete('/:id', function(req, res, next) {
  models.roles.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(role => models.roles.destroy({
        where: {
          id: role.id
        }
      }))
    .then((role) => {
      return helpers.finalResponse(200 , {message: 'Role deleted successfuly!'}, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;