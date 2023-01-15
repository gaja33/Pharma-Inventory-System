// Doctors model
let Doctors = require("../models/doctors");

// Add Doctors
module.exports.createDoctors = function (req, res, next) {
  console.log(req.headers);
  let body = req.body;
  body.userId = req.auth._id;
  body.storeId = req.headers.storeid;

  Doctors.create(body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Get All Doctors
module.exports.getAllDoctors = function (req, res, next) {
  Doctors.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Get single Doctors
module.exports.getDoctors = function (req, res, next) {
  Doctors.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Update Doctors
module.exports.updateDoctors = function (req, res, next) {
  Doctors.findByIdAndUpdate(
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

// Delete Doctors
module.exports.deleteDoctors = function (req, res, next) {
  Doctors.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};
