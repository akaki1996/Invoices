let mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true},
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
  activated: { type: Date, required: false }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

let registration = mongoose.model('user', UserSchema);
module.exports = registration;