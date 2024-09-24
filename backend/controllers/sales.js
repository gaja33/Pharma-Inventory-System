// Sales model
let Sales = require("../models/sales");
let Stocks = require("../models/stocks");

// Add Sales
module.exports.createSales = function (req, res, next) {
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
      createStocks(body.items);
      res.json(data);
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
  Sales.findById(req.params.id, (error, salesData) => {
    if (error) {
      return next(error);
    } else {
      let arr = [];
      salesData.items.forEach((item, index) => {
        arr.push(index);
        if (item.qty != req.body.items[index].qty) {
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
                updateStocks(req.body.items[index], item.qty);
              }
            }
          );
        } else {
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
              }
            }
          );
        }
      });
      if (salesData.items.length == arr.length) {
        res.json({
          messagecode: 200,
          message: "Data updated successfully",
        });
      }
    }
  });
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

var createStocks = (items) => {
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

var updateStocks = (item, prevCount) => {
  // items.forEach((item) => {
  //   Stocks.findById(item.itemDetails._id, (error, stockDATA) => {
  //     if (error) {
  //       return next(error);
  //     } else {
  //       console.log("stockDATA", stockDATA);
  //       Stocks.updateOne(
  //         { batch: stockDATA.batch },
  //         {
  //           $set: {
  //             totalQty: stockDATA.totalQty - item.qty,
  //           },
  //           $currentDate: { lastModified: true },
  //         },
  //         (err, updated) => {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             console.log("updated", updated);
  //           }
  //         }
  //       );
  //     }
  //   });
  // });
  Stocks.findById(item.itemDetails._id, (error, stockDATA) => {
    if (error) {
      return next(error);
    } else {
      Stocks.updateOne(
        { batch: stockDATA.batch },
        {
          $set: {
            totalQty: stockDATA.totalQty - (item.qty - prevCount),
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
};
