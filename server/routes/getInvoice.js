var express = require('express');
var mongoose = require('mongoose');
var invoice = require('../models/invoice');
var invoiceitem = require('../models/invoiceitem');
var session = require('express-session');
var router = express.Router();

router.post('/getinvoice', function(req, res, next) {
  const request = req.body;

  invoice.find({'_id': mongoose.Types.ObjectId(request.data)}, '-userId -__v -created -modified',function(err, inf){
    if (inf)
    {
      var itemsResult = [];
      invoiceitem.find({'invoiceId': request.data}, '-__v -_id', function(err, resp){
        if (resp)
        {
          resp.forEach(function(u){
            itemsResult.push(u);
          });
          let inv = {'data': inf[0], 'items': itemsResult};
          res.send({data: { res: 'success', 'invoice': inv }});
        }
      });
    }
  });
});

module.exports = router;