const getIP = require('ipware')().get_ip;
const browser = require('browser-detect');
const models = require("./models");
const jwt = require('jsonwebtoken');
const config = require('./config');
const helpers = require('./shared');
const email = require('./smtp-mail');
function log(req, res, next) {
    let ipInfo = getIP(req);
    let result = browser(req.headers['user-agent']);
    req.ipInfo = ipInfo;
    req.browser = result;
    let analytics = {};
    analytics.name = (result && result.name) ? result.name: 'UnNone';
    analytics.version = (result && result.version) ? result.version: 'UnNone';
    analytics.versionNumber = (result && result.versionNumber) ? result.versionNumber: 'UnNone';
    analytics.mobile = result ? result.mobile: false;
    analytics.os = (result && result.os) ? result.os: 'UnNone';
    analytics.clientIp = (ipInfo && ipInfo.clientIp) ? ipInfo.clientIp: 'UnNone';
    analytics.clientIpRoutable = ipInfo ? ipInfo.clientIpRoutable: false;
    analytics.url = req.url;
    req.analytics = analytics;
    let token = req.headers['x-access-token'];
    // email.testEmail();
    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {      
        if (decoded) {
          analytics.userId = decoded.id;
          analytics.createdBy = decoded.userFullName? decoded.userFullName: 'Anonymous(Public User)';
        } else {
          analytics.createdBy = 'Anonymous(Public User)';
        }
        models.analytics.create(analytics)
          .then((analytics) => {
            req.analytics = analytics;
            next();
          })
          .catch((error) => {
            console.log('analytics error : ', error);
            res.status(500).send(['analytics error : ', error]);
          });      
      });
    } else {
      analytics.createdBy = 'Anonymous(Public User)';
      models.analytics.create(analytics)
        .then((analytics) => {
          req.analytics = analytics;
          next();
        })
        .catch((error) => {
          res.status(500).send(['analytics error : ', error]);
        });
    }
}

module.exports = log;