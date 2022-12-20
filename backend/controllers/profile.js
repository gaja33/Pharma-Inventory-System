var mongoose = require("mongoose");
//var User = mongoose.model("User");
let User = require("../models/users");

module.exports.profileRead = function (req, res) {
  console.log("response", req.auth);
  if (!req.auth._id) {
    res.status(401).json({
      message: "UnauthorizedError: private profile",
    });
  } else {
    User.findById(req.auth._id).exec(function (err, user) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      });
    });
  }
};
