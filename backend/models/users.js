const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

let userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
    },
    name: {
      type: String,
    },
    storeId: {
      type: String,
    },
    hash: String,
    salt: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    },
    "MY_SECRET"
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model("User", userSchema);
