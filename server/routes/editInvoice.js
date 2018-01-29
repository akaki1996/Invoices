var express = require('express');
var invoice = require('../models/invoice');
var invoiceitem = require('../models/invoiceitem');
var session = require('express-session');
var router = express.Router();

router.put('/invoices/edit', function(req, res, next) {
  const request = req.body;

  invoice.findOneAndUpdate({_id: request.id}, {name: request.name, date: request.date,
      userId: req.session.userId, description: request.description, contactName: request.contactName,
      address: request.address, total: request.total, modified: new Date()},function(err, doc){
    if (err)
    {
      res.send({data: {res: 'Failed to save, Error: ' + err}});
    }
    else
    {
      let promises = request.items.map(function(itemInfo){
        return new Promise(function(resolve, reject){
          invoiceitem.findOneAndUpdate({ invoiceId: request.id, id: itemInfo.id}, {name: itemInfo.name,
              description: itemInfo.description, quantity: itemInfo.quantity, price: itemInfo.price,
              total: itemInfo.total, userId: req.session.userId}, { upsert : true }, function(err, doc){
            if (err)
            {
              reject({'data': 'Failed to save, Error: ' + err});
            }
            else
            {
              resolve('Added');
            }
          });
        });
      });

      Promise.all(promises)
          .then(function(data) {
            let inv = data.every(function(val){ return val === 'Added' }) ? 'success' : 'failed';
            res.send({data: { res: inv}});
          });
    }
  });
});

module.exports = router;