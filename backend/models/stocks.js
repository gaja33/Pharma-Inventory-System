const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Stocks = new Schema(
  {
    name: {
      type: String,
    },
    companyName: {
      type: String,
    },
    type: {
      type: String,
    },
    batch: {
      type: String,
    },
    mfgDate: {
      type: String,
    },
    expDate: {
      type: String,
    },
    pricePerPkgOrStrip: {
      type: Number,
    },
    itemsInPkgOrStrip: {
      type: Number,
    },
    qty: {
      type: Number,
    },
    looseQty: {
      type: Number,
    },
    totalQty: {
      type: Number,
    },
    shelfName: {
      type: String,
    },
    dealerInfo: {
      name: {
        type: String,
      },
      contactNumber: {
        type: Number,
      },
    },
    gstHsnInfo: {
      hsnCode: {
        type: String,
      },
      cgst: {
        type: Number,
      },
      sgst: {
        type: Number,
      },
      igst: {
        type: Number,
      },
    },
    userId: {
      type: String,
    },
    storeId: {
      type: String,
    },
  },
  {
    collection: "stocks",
    timestamps: true,
  }
);

module.exports = mongoose.model("Stocks", Stocks);
