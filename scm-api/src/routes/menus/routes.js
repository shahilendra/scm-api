const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;


/* GET menus listing. */
router.get('/', function(req, res, next) {
    models.menus.findAll()
      .then((items) => {
        return helpers.finalResponse(200 , items, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.menus.findOne({ 
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

/* add new menus. */
router.post('/', function(req, res, next) {
  let item = {};
  helpers.updateMenu(item, req.body, req.userFullName)
    .then(item => models.menus.create(item))
    .then((item) => {
      return helpers.finalResponse(200 , item, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* update menus by id. */
router.put('/:id', function(req, res, next) {
  models.menus.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(item => helpers.updateMenu(item, req.body, req.userFullName))
    .then(item => models.menus.update(item, { returning: true, where: { id: req.params.id } }))
    .then((item) => {
      return helpers.finalResponse(200 , item, res);
    })
    .catch((error) => {
      console.log('error : ', error);
      return helpers.finalResponse(error.status , error, res);
    });
});

/* delete menus by id. */
router.delete('/:id', function(req, res, next) {
  models.menus.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(item => models.menus.destroy({
        where: {
          id: item.id
        }
      }))
    .then((item) => {
      return helpers.finalResponse(200 , { message: 'Menus deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;