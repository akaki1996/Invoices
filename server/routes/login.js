var express = require('express');
var registration = require('../models/registration');
var bcrypt   = require('bcrypt-nodejs');
var session = require('express-session');
var router = express.Router();

router.post('/login', function(req, res, next) {
  registration.findOne({ 'username': req.body.username}, function(err, docs){
    if (docs)
    {
      bcrypt.compare(req.body.password, docs.password, function(err, isMatch){
        if (err)
        {
          res.send({'data': 'error: ' + err})
        }
        else if (isMatch === true)
        {
          req.session.userId = docs._id;

          res.send({'data': {
            'res': 'success',
            'token': bcrypt.hashSync(req.session.id)
          }});
        }
        else
        {
          res.send({'data': {'res': 'fail'}});
        }
      });
    }
    else
    {
      res.send({'data': {'res': 'fail'}});
    }
  })
});

module.exports = router;