let mongoose = require('mongoose');

var Schema = mongoose.Schema;

//FIXME: change userName on userID

let invoiceSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  name: { type: String, required: false },
  date: { type: Date, required: false },
  created: { type: Date, required: true },
  modified: {type: Date, required: true },
  userId: { type: String, required: true },
  description: {type: String, required: false},
  contactName: { type: String, required: false },
  address: { type: String, required: false },
  total: { type: Number, required: false }
});

let invoice = mongoose.model('invoice', invoiceSchema);
module.exports = invoice;