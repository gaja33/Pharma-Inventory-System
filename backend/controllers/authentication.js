var passport = require("passport");
var mongoose = require("mongoose");
//var User = mongoose.model("User");
let User = require("../models/users");

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function (req, res) {
  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log("register", req.body.role, req.body.email, req.body);

  var user = new User();

  user.role = req.body.role;
  user.email = req.body.email;
  user.name = req.body.name;
  user.storeId = null;

  user.setPassword(req.body.password);

  user.save(function (err, result) {
    console.log("register save err", err);
    console.log("register save result", result);
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      token: token,
    });
  });
};

module.exports.login = function (req, res) {
  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate("local", function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token,
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};
