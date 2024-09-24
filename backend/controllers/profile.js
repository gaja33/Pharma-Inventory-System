// Profile model
let Profile = require("../models/profile");
let User = require("../models/users");

// Add Profile
module.exports.createProfile = function (req, res, next) {
  Profile.create(req.body, (error, profileData) => {
    if (error) {
      return next(error);
    } else {
      User.findById(req.auth._id, (error, user) => {
        User.updateOne(
          { email: user.email },
          {
            $set: {
              storeId: profileData._id,
            },
            $currentDate: { lastModified: true },
          },
          (err, data1) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Data updated successfully");
              res.json(profileData);
            }
          }
        );
      });
    }
  });
};

// Get All Profile
module.exports.getAllProfile = function (req, res, next) {
  Profile.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Get single Profile
module.exports.getProfile = function (req, res, next) {
  Profile.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Update Profile
module.exports.updateProfile = function (req, res, next) {
  Profile.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json({
          messagecode: 200,
          message: "Data updated successfully",
          data: data,
        });
        console.log("Data updated successfully");
      }
    }
  );
};

// Delete Profile
module.exports.deleteProfile = function (req, res, next) {
  Profile.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};
