var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
const models = require("../../models");
const helpers = require("../../shared").helpers;
function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  if (!token) 
    return helpers.finalResponse(403, { auth: false, message: 'No token provided.' }, res);
  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {      
    if (err)
      return helpers.finalResponse(500, { auth: false, message: 'Failed to authenticate token.' }, res);
    // if everything is good, save to request for use in other routes1
    req.userId = decoded.id;
    if(!decoded.organisationId && !req.url.contains('/login-as-organization')) {
      return helpers.finalResponse(500, { auth: false, message: 'Organization login Failed to authenticate token.' }, res);
    }

    req.organisationId = decoded.organisationId;
    req.body.organisationId = decoded.roleId != 1? decoded.organisationId: req.body.organisationId? req.body.organisationId: decoded.organisationId;
    models.users.findOne({
      where: {
        id: req.userId
      }
    })
    .then((user) => {
      if (!user)
        return helpers.finalResponse(500, { auth: false, message: 'This is not a correct token.' });
      user['loginCenterId'] = req.organisationId;
      req.userFullName = `${user.firstName} ${user.lastName} (${user.email})`;
      return helpers.getUserProfile(user);
    })
    .then((user) => {
      req.curentUser = user;
      next();
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
  });
}

module.exports = verifyToken;