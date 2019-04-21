const express = require('express');
const router = express.Router();
const models = require("../../models");
const helpers = require("../../shared").helpers;
const images = require("./images");


/* GET users listing. */

router.get('/', function(req, res, next) {
  let filter = {};
  models.users.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'age', 'gender', 'isActive', 'details', 'createdAt','updatedAt', 'roleId']
  })
  .then((users) => {
    return helpers.finalResponse(200 , users, res);
  })
  .catch((error) => {
   return helpers.finalResponse(error.status , error, res);
  });
});

router.get('/:id', function(req, res, next) {
  models.users.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'age', 'gender', 'isActive', 'details', 'createdAt','updatedAt', 'roleId']
  })
  .then((user) => {
    return helpers.finalResponse(200 , user, res);
  })
  .catch((error) => {
    return helpers.finalResponse(error.status , error, res);
  });
});

/* add new user. */
router.post('/', function(req, res, next) {
  let user = {};
  helpers.updateUser(user, req.body)
    .then(user => models.users.create(user))
    .then((user) => {
      return helpers.finalResponse(200 , user, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* update user by id. */
router.put('/:id', function(req, res, next) {
  models.users.findOne({
       where: {
          id: req.params.id
       }
    })
    .then(user => helpers.updateUser(user, req.body))
    .then(user => models.users.update(user, { returning: true, where: { id: req.params.id } }))
    .then((user) => {
      return helpers.finalResponse(200 , user, res);
    })
    .catch((error) => {
      console.log('error status : ', error);
      return helpers.finalResponse(error.status , error, res);
    });
});

/* delete user by id. */
router.delete('/:id', function(req, res, next) {
  models.users.findOne({ where: {
      id: req.params.id
    }})
    .then((user) => {
      return models.users.destroy({
        where: {
          id: user.id
        }
      });
    })
    .then((user) => {
      return helpers.finalResponse(200 , {message: 'User deleted successfuly!'}, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

// Image routes start 

/* get image By user by id. */
router.get('/:id/images/', images.getByUserId);

/* get image By image id and user by id. */
router.get('/:id/images/:imageId', images.getByImageId);

/* add user images by id. */
router.post('/:id/images', images.add);

/* update user images by user and image id. */
router.put('/:id/images/:imageId', images.update);

/* delete user image by user and image id. */
router.delete('/:id/images/:imageId', images.delete);

//Image rotes end

module.exports = router;
