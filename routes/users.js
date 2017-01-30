var express = require('express');
var router = express.Router();
var models = require('../server/models/index');
var moment = require('moment');


/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll({}).then(function(users) {
    res.render('users/index', {users: users});
  });
});

router.get('/new', function(req, res, next) {
    res.render('users/new');
});

router.post('/', function(req, res, next) {
   models.User.create({
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     email: req.body.email,
     dob: req.body.dob
   }).then(function() {
      res.redirect('/users');
   });
});

router.get('/:id', function(req, res, next) {
  models.User.findById(req.params.id).then(function(user) {
    res.render('users/show', { user:user, moment: moment });
  });
});


router.get('/:id/edit', function(req, res, next) {
  models.User.findById(req.params.id).then(function(user) {
    res.render('users/edit', {user: user, moment: moment});
  });
});

router.put('/:id', function(req, res, next) {
  models.User.update({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob
  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/users/' + req.params.id);
  });
});


router.delete('/:id', function(req, res, next) {
  models.User.destroy({
    where: {id: req.params.id}
  }).then(function(user) {
    res.redirect('/users');
  });
});



module.exports = router;

 // user will look up all user information, findAll will find every occurence of the users in the query
 // it will render the response as users/index template defined in our views folder
