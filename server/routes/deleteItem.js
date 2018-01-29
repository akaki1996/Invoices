var express = require('express');
var invoiceitem = require('../models/invoiceitem');
var router = express.Router();

router.delete('/invoices/details/delete', function(req, res) {
  invoiceitem.deleteOne({ 'id': req.body.itemId, 'invoiceId': req.body.invoiceId }, function (err) {
    if (!err)
    {
      res.send({data: { res: 'success'}});
    }
    else
    {
      res.send({data: { res: 'failed'}});
    }
  })
});

module.exports = router;