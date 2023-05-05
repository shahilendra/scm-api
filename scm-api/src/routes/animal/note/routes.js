const express = require('express');
const router = express.Router({ mergeParams: true });
const models = require("../../../models");
const helpers = require("../../../shared").helpers;

router.get('/', function(req, res, next) {
    models.note.findAll({ 
      where: {
        organisationId: req.organisationId,
        animalId: req.params.animalId
      },
      order: [
        ['date', 'DESC'],
        ['time', 'DESC'],
    ],
    })
      .then((notes) => {
        return helpers.finalResponse(200 , notes, res);
      })
      .catch((error) => {
        return helpers.finalResponse(error.status , error, res);
      });
});

router.get('/:id', function(req, res, next) {
  models.note.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then((note) => {
      return helpers.finalResponse(200 , note, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.post('/', function(req, res, next) {
  let note = {};
  helpers.updateNote(note, req.body, req.userFullName, req.params.animalId)
    .then(note => models.note.create(note))
    .then((note) => {
      return helpers.finalResponse(200 , note, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.put('/:id', function(req, res, next) {
  models.note.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(note => helpers.updateNote(note, req.body, req.userFullName, req.params.animalId))
    .then(note => models.note.update(note, { returning: true, where: { id: req.params.id } }))
    .then((note) => {
      return helpers.finalResponse(200 , note, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

router.delete('/:id', function(req, res, next) {
  models.note.findOne({ 
      where: {
        id: req.params.id
      }
    })
    .then(note => models.note.destroy({
        where: {
          id: note.id
        }
      }))
    .then((note) => {
      return helpers.finalResponse(200 , { message: 'Note deleted successfuly!' }, res);
    })
    .catch((error) => {
      return helpers.finalResponse(error.status , error, res);
    });
});

module.exports = router;