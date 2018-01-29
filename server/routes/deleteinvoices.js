var express = require('express');
var invoice = require('../models/invoice');
var invoiceitem = require('../models/invoiceitem');
var mongoose = require('mongoose');
var router = express.Router();

router.delete('/invoices/delete', function(req, res, next) {
  invoice.deleteOne({ '_id': mongoose.Types.ObjectId(req.body.data) }, function (err) {
    if (!err)
    {
      invoiceitem.deleteMany({ invoiceId: req.body.data }, function (err) {
        err ? res.send({data: { res: 'failed'}}) : res.send({data: { res: 'success', invoiceId: req.body.data}});;
      })
    }
    else
    {
      res.send({data: { res: 'failed'}});
    }
  })
});

module.exports = router;