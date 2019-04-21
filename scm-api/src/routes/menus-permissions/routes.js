const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;


/* GET menusPermissions listing. */
router.get('/', function(req, res, next) {
    models.menusPermissions.findAll()
      .then((items) => {
        return helpers.finalResponse(200 , items, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.menusPermissions.findOne({ 
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

/* add new menusPermissions. */
router.post('/', function(req, res, next) {
  let item = {};
  helpers.updateMenusPermission(item, req.body, req.userFullName)
    .then(item => models.menusPermissions.create(item))
    .then((item) => {
      return helpers.finalResponse(200 , item, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* update menusPermissions by id. */
router.put('/:id', function(req, res, next) {
  models.menusPermissions.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(item => helpers.updateMenusPermission(item, req.body, req.userFullName))
    .then(item => models.menusPermissions.update(item, { returning: true, where: { id: req.params.id } }))
    .then((item) => {
      return helpers.finalResponse(200 , item, res);
    })
    .catch((error) => {
      console.log('error : ', error);
      return helpers.finalResponse(error.status , error, res);
    });
});

/* delete menusPermissions by id. */
router.delete('/:id', function(req, res, next) {
  models.menusPermissions.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(item => models.menusPermissions.destroy({
        where: {
          id: item.id
        }
      }))
    .then((item) => {
      return helpers.finalResponse(200 , { message: 'MenusPermissions deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;