const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt    =   require("bcryptjs");
const crypto  =   require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date
});

userSchema.pre('save',async function(next){
    //only run if pwd is modified
    if(!this.isModified('password')) return next();
    //hash the pwd with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function(){
  //create  simple random token
  const resetToken = crypto.randomBytes(32).toString('hex');
  //encrypt the simple token and save it to DB
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10*60*1000;
  // send simple token to email
  return resetToken;

}

module.exports = mongoose.model('User', userSchema);
