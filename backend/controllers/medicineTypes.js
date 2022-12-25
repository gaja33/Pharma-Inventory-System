// Medicine Types model
let MedicineTypes = require("../models/medicineTypes");

// Add MedicineTypes
module.exports.createMedicineTypes = function (req, res, next) {
  MedicineTypes.create(req.body, (error, data) => {
    if (error) {
      //duplicate key
      if (error && error.code === 11000) {
        res.json({
          messagecode: 204,
          error: "Medicine Type already exists",
        });
      }
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Get All MedicineTypes
module.exports.getAllMedicineTypes = function (req, res, next) {
  MedicineTypes.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Get single MedicineTypes
module.exports.getMedicineTypes = function (req, res, next) {
  MedicineTypes.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Update MedicineTypes
module.exports.updateMedicineTypes = function (req, res, next) {
  MedicineTypes.findByIdAndUpdate(
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

// Delete MedicineTypes
module.exports.deleteMedicineTypes = function (req, res, next) {
  MedicineTypes.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};
