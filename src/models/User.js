const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['farmer', 'buyer', 'admin'], required: true },
  name: { type: String, required: true },
  phone: { type: String, index: true },
  email: { type: String, lowercase: true, index: true , unique : true , required: true},
  password: { type: String, required: true, select: false }, // hashed
  deviceToken: { type: String }, // for FCM
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.compare = function (pw) { return bcrypt.compare(pw, this.password); };

module.exports = mongoose.model('User', userSchema);
