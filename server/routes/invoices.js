var express = require('express');
var invoice = require('../models/invoice');
var session = require('express-session');
var router = express.Router();

router.get('/invoices', function(req, res, next) {
  invoice.find({'userId': req.session.userId}, '-userId -__v', {sort: '-modified'}, function(err, inv) {
    if (err) {
      res.send({data: { res: 'fail' }});
    } else {
      res.send({data: { res: 'success', 'invoices': inv }});
    }
  });
});

module.exports = router;