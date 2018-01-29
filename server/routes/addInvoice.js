var express = require('express');
var invoice = require('../models/invoice');
var invoiceitem = require('../models/invoiceitem');
var session = require('express-session');
var router = express.Router();

router.post('/invoices/create', function(req, res, next) {
  const request = req.body;

  let inv = new invoice({userId: req.session.userId, name: request.name, date: request.date,
      description: request.description, contactName: request.contactName, address: request.address,
      total: request.total, created: new Date(), modified: new Date()});

  inv.save(function(err, room){
    if (err)
    {
      res.send({data: {res: 'Failed to save, Error: ' + err}});
    }
    else
    {
      let promises = req.body.items.map(function(itemInfo){
        return new Promise(function(resolve, reject){
          let item = new invoiceitem({id: itemInfo.id, invoiceId: room._id, name: itemInfo.name, description: itemInfo.description,
            quantity: itemInfo.quantity, price: itemInfo.price, total: itemInfo.total, userId: req.session.userId});
          item.save(function(err){
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