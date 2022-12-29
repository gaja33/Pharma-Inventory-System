// Stocks model
let Stocks = require("../models/stocks");

// Add Stocks
module.exports.createStocks = function (req, res, next) {
  let body = req.body;
  body.totalQty = req.body.itemsInPkgOrStrip * req.body.qty + req.body.looseQty;
  body.looseQty = req.body.looseQty;
  body.userId = req.auth._id;
  body.storeId = req.headers.storeid;

  Stocks.findOne(
    {
      batch: req.body.batch,
    },
    (error, data) => {
      console.log("data", data);
      if (data) {
        if (data.batch === req.body.batch) {
          Stocks.updateOne(
            { batch: req.body.batch },
            {
              $set: {
                totalQty: data.totalQty + body.totalQty,
                looseQty: body.looseQty,
              },
              $currentDate: { lastModified: true },
            },
            (err, data) => {
              if (error) {
                console.log(error);
              } else {
                Stocks.findOne(
                  { batch: req.body.batch },
                  (error, updatedData) => {
                    console.log(updatedData);
                    if (error) {
                      return next(error);
                    } else {
                      res.json(updatedData);
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        Stocks.create(body, (error, data) => {
          if (error) {
            //duplicate key
            if (error && error.code === 11000) {
              res.json({
                messagecode: 204,
                error: "Medicine already exists",
              });
            }
            return next(error);
          } else {
            res.json(data);
          }
        });
      }
    }
  );
};

// Get All Stocks
module.exports.getAllStocks = function (req, res, next) {
  Stocks.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Get single Stocks
module.exports.getStock = function (req, res, next) {
  Stocks.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Update Stocks
module.exports.updateStocks = function (req, res, next) {
  let body = req.body;
  body.totalQty = req.body.itemsInPkgOrStrip * req.body.qty + req.body.looseQty;
  body.looseQty = req.body.looseQty;
  body.userId = req.auth._id;
  body.storeId = req.headers.storeid;

  Stocks.findByIdAndUpdate(
    req.params.id,
    {
      $set: body,
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

// Delete Stocks
module.exports.deleteStocks = function (req, res, next) {
  Stocks.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};
