const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const VerifyToken = require('./verify-token');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const models = require("../../models");
const helpers = require("../../shared").helpers;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');
const sequelize = require("../../db");

router.post('/login', function(req, res) {
  models.users.findOne({
       where: {
          email: req.body.email
       }
    })
    .then((user) => {
      if (!user)
        return helpers.finalError(401, { message: 'No user found.' });
      if(!user.isActive) {
        return helpers.finalError(401, { message: 'Your account is not activated please contact with customer supports.'});
      }
      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid)
        return helpers.finalError(401, { auth: false, token: null, user: null, message: 'User password is not correct!.'});
      return helpers.getUserProfile(user);
    })
    .then((user) => {
      return sequelize.query(`SELECT Organisations.id, Organisations.name, Organisations.descriptions 
        FROM Organisations INNER JOIN  OrganisationsUsers 
        ON Organisations.id = OrganisationsUsers.organisationId 
        WHERE OrganisationsUsers.isActive = 1  AND OrganisationsUsers.userId = :userId`,
        { replacements: { userId: user.id }, type: sequelize.QueryTypes.SELECT }
      )
      .then((organisations) => {
        user.organisations = organisations;
        return helpers.getPromise(user);
      })
      .catch((error) => {
        return helpers.finalError(500, error);
      })
    })
    .then((user) => {
      let obj = {
      };
      if(user.organisations && user.organisations.length ==1) {
        obj = {
          id: user.id,
          userFullName: `${user.firstName} ${user.lastName} (${user.email})`,
          organisationId: user.organisations[0].id,
          roleId: user.roleId
        };
        user.loginOrganisation = user.organisations[0];
        user.loginOrganisationId = user.organisations[0].id
      } else {
        obj = {
          id: user.id,
          userFullName: `${user.firstName} ${user.lastName} (${user.email})`,
          roleId: user.roleId
        };
      }
      let token = jwt.sign(obj, config.secret, {
        expiresIn: config.expiresIn
      });

      let responseUser = { auth: true, token: token, user: user };
      return helpers.finalResponse(200, responseUser, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/login-as-organization', VerifyToken, function(req, res) {
  models.users.findOne({
       where: {
          id: req.userId
       }
    })
    .then((user) => {
      if (!user)
        return helpers.finalError(401, { message: 'No user found.'});
      if(!user.isActive) {
        return helpers.finalError(401, { message: 'Your account is not activated please contact with customer supports.'});
      }
      return helpers.getUserProfile(user);
    })
    .then((user) => {
      return sequelize.query(`SELECT Organisations.id, Organisations.name, Organisations.descriptions 
        FROM Organisations INNER JOIN  OrganisationsUsers 
        ON Organisations.id = OrganisationsUsers.organisationId 
        WHERE OrganisationsUsers.isActive = 1  AND OrganisationsUsers.userId = :userId`,
        { replacements: { userId: user.id }, type: sequelize.QueryTypes.SELECT }
      )
      .then((organisations) => {
        user.organisations = organisations;
        console.log('user.organisations', user);
        return helpers.getPromise(user);
      })
      .catch((error) => {
        return helpers.finalError(500, error);
      })
    })
    .then((user) => {
      let obj = {
       };
      let isSetOrg = false;
      if(user.organisations && user.organisations.length ==1) {
        user.organisations.forEach((org) => {
          if(req.body.organisationId == org.id) {
            isSetOrg = true;
            obj = {
              id: user.id,
              organisationId: user.organisations[0].id,
              userFullName: `${user.firstName} ${user.lastName} (${user.email})`,
              roleId: user.roleId
            };
            user.loginOrganisation = user.organisations[0];
            user.loginOrganisationId = user.organisations[0].id;
          }
        });
        if(!isSetOrg) {
          obj = {
            id: user.id,
            userFullName: `${user.firstName} ${user.lastName} (${user.email})`,
            roleId: user.roleId
          };
        }
      } else {
        obj = {
          id: user.id,
          roleId: user.roleId
        };
      }
      let token = jwt.sign(obj, config.secret, {
        expiresIn: config.expiresIn
      });
      // req.analytics
      let responseUser = { auth: true, token: token, user: user };
      return helpers.finalResponse(200, responseUser, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.get('/logout', function(req, res) {
  let responseUser = { auth: false, token: null, user: null };
  return helpers.finalResponse(200, responseUser, res);
});

router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  models.users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    age: req.body.age,
    gender: req.body.gender,
    roleId: 1,
    isActive: true,
    isActivated: false,
    activationCode: helpers.getRendomeString()
  })
  .then((user) =>{ 
    return models.organisationsUsers.create({
      userId: user.id,
      organisationId: 1,
      createdBy: `${user.firstName} ${user.lastName} (${user.email})`,
      updatedBy: `${user.firstName} ${user.lastName} (${user.email})`,
    })
    .then((orgUser)=>{
      return Promise.resolve(user);
    })
    .catch((error)=>{
      return Promise.reject(error);
    });    
   })
  .then((user) => {
    return helpers.getUserProfile(user);
  })
  .then((user) => {
    let token = jwt.sign({ id: user.id, userFullName: `${user.firstName} ${user.lastName} (${user.email})`, roleId: user.roleId }, config.secret, {
      expiresIn: config.expiresIn
    });
    let responseUser = { auth: false, token: null, user: null };
    return helpers.finalResponse(200, responseUser, res);
  })
  .catch((error) => {
    return helpers.finalResponse(error.status , error, res);
  });
});

router.get('/me', VerifyToken, function(req, res, next) {
   models.users.findOne({ 
      where: {
        id: req.userId
      }
    })
    .then((user) => {
      return helpers.getUserProfile(user)
    })
    .then((item) => {
      return helpers.finalResponse(200, item, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status, error, res);
    });
});

router.post('/me', VerifyToken, function(req, res, next) {
  return models.users.findOne({
    where: {
      id: req.userId
    }
  })
  .then(user => helpers.updateUser(user, req.body))
  .then(user => models.users.update(user, {
    where: {
      id: req.userId
    }
  }))
  .then((user) => {
    return helpers.finalResponse(200, user, res);
  })
  .catch((error) => {
    console.log(error);
    return helpers.finalResponse(error.status , error.data, res);
  });
});


/* update device by id. */
router.get('/check-activation/:code', function(req, res, next) {
  helpers.findOne({
      where: {
        activationCode: req.params.code
      }
    })
    .then((user) => {
      let result = {
        tokenStatus: 1,
        user: user
      } 
      if(user && user.isActivated) {
        result.tokenStatus = 2; // your already activated
      } else if(!user || user == null) {
        result.tokenStatus = 3; // token not exist
      }
      return helpers.finalResponse(200 , result, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* update device by id. */
router.put('/activate-profile/:code', function(req, res, next) {
  models.users.findOne({
      where: {
        activationCode: req.params.code,
        isActive: false,
        isActivated: false
      }
    })
    .then((user) => {
      user.isActive = true;
      user.isActivated = true;
      return models.users.update(user, {
        where: {
          activationCode: req.params.code
        }
      })
    })
    .then((user) => {
      let result = {
        tokenStatus: 2
      } 
      return helpers.finalResponse(200 , result, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});


/* GET menus listing. */
router.get('/me-menus', VerifyToken, function(req, res, next) {
    models.menus.findAll({
      where: {
        isActive: true
      },
      order: [
        ['displayOrder', 'ASC']
      ]
    })
    .then((items) => {
      return helpers.convert(items);
    })
    .then((items) => {
      return helpers.finalResponse(200 , items, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

/* GET parents menus listing. */
router.get('/me-parents-menus', VerifyToken, function(req, res, next) {
    models.menus.findAll({
      where: {
        type: 'collapse'
      },
      order: [
        ['displayOrder', 'ASC']
      ]
    })
    .then((items) => {
      return helpers.finalResponse(200 , items, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});
module.exports = router;