var express = require('express');
var registration = require('../models/registration');
var bcrypt   = require('bcrypt-nodejs');
var session = require('express-session');
var router = express.Router();

router.get('/logout', function(req, res) {
  if (req.session && req.session.userId)
  {
    delete req.session.userId;
  }

  res.send({'data': {
    'res': 'success'
  }});
});

module.exports = router;