let mongoose = require('mongoose');

var Schema = mongoose.Schema;

let invoiceItemSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: false },
  description: { type: String, required: false },
  quantity: { type: Number, required: false },
  price: { type: Number, required: false },
  total: { type: Number, required: false },
  userId: { type: String, required: true},
  invoiceId: { type: String, required: true}
});

let invoiceItem = mongoose.model('invoiceItem', invoiceItemSchema);
module.exports = invoiceItem;