
const models = require("../../models");
const helpers = require("../../shared").helpers;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './src/assets/images');
  },
  filename: function (request, file, callback) {
    callback(null, file.fieldname + '-' + request.params.id + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage}).single('photo');

module.exports.add = function (req, res, next) {
 	upload(req, res, function(err) {
    if(error) {
      return helpers.finalError(500, error);
    }
    
    let image = new models.images();
    helpers.mapImageMetaData(image, req.file, req.params.id)
     .then(image => helpers.save(image))
     .then((image) => {
        return helpers.finalResponse(200 , image, res);
     })
     .catch((error)=> {
       return helpers.finalResponse(error.status , error, res);s
     });
  });
};

module.exports.update = function (req, res, next) {
  upload(req, res, function(err) {
    if(err) {
      return helpers.finalError(500, error);
    }
    let previousImagePath = ''
    helpers.findOne(models.images,  {_id: req.params.imageId, userId: req.params.id })
    .then((image) => {
      previousImagePath = image.path;
      return helpers.mapImageMetaData(image, req.file, req.params.id)
    })
    .then(image => helpers.save(image)) 
    .then(image => helpers.deleteFileFromDirectory(image, previousImagePath))
    .then((image) => {
      return helpers.finalResponse(200 , iamge, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
  });
};


module.exports.delete = function (req, res, next) {
  let previousImagePath = ''
  helpers.findOne(models.images, { _id: req.params.imageId, userId: req.params.id })
    .then((image) => {
      previousImagePath = image.path;
      return helpers.deleteEntity(image);
    })
    .then(image => helpers.deleteFileFromDirectory(image, previousImagePath))
    .then((image) => {
      return helpers.finalResponse(200 , {message: 'User image deleted successfuly!'}, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
};


module.exports.getByImageId = function (req, res, next) {
   helpers.findOne(models.images, {_id: req.params.imageId, userId: req.params.id })
      .then((image) => {
        return helpers.finalResponse(200, image, res)
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
};

module.exports.getByUserId = function (req, res, next) {
  helpers.find(models.images, {userId: req.params.id})
      .then((images) => {
        return helpers.finalResponse(200, images, res)
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
};

