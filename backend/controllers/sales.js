// Sales model
let Sales = require("../models/sales");
let Stocks = require("../models/stocks");

// Add Sales
module.exports.createSales = function (req, res, next) {
  console.log(req.headers);
  let body = req.body;
  body.userId = req.auth._id;
  body.storeId = req.headers.storeid;

  Sales.create(body, (error, data) => {
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
      updateStocks(body.items);
      res.json(data);
      console.log("Sales", data);
    }
  });
};

// Get All Sales
module.exports.getAllSales = function (req, res, next) {
  Sales.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Get single Sales
module.exports.getSales = function (req, res, next) {
  Sales.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Update Sales
module.exports.updateSales = function (req, res, next) {
  Sales.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        updateStocks(req.body.items);
        res.json({
          messagecode: 200,
          message: "Data updated successfully",
          data: data,
        });
      }
    }
  );
};

// Delete Sales
module.exports.deleteSales = function (req, res, next) {
  Sales.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};

var updateStocks = (items) => {
  items.forEach((item) => {
    Stocks.findById(item.itemDetails._id, (error, stockDATA) => {
      if (error) {
        return next(error);
      } else {
        console.log("stockDATA", stockDATA);
        Stocks.updateOne(
          { batch: stockDATA.batch },
          {
            $set: {
              totalQty: stockDATA.totalQty - item.qty,
            },
            $currentDate: { lastModified: true },
          },
          (err, updated) => {
            if (err) {
              console.log(err);
            } else {
              console.log("updated", updated);
            }
          }
        );
      }
    });
  });
};
