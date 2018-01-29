var express = require('express');
var registration = require('../models/registration');
var router = express.Router();

router.post('/signup', function(req, res, next) {
  registration.find({ 'username': req.body.username }, function(err, docs){
    if (docs.length)
    {
      res.send({'data': {'res': 'failed', 'info': 'Name already exists'}});
    }
    else
    {
      let user = new registration({ username: req.body.username, email: req.body.email });
      user.password = user.generateHash(req.body.password);
      user.save(function(err){
        if (err)
        {
          res.send({'data': {'res': 'failed', 'info': err}});
        }
        else
        {
          res.send({'data': {'res': 'success'}});
        }
      });
    }
  });
});

module.exports = router;