const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Sales = new Schema(
  {
    billId: {
      type: String,
    },
    billDate: {
      type: String,
    },
    patientInfo: {
      name: {
        type: String,
      },
      contactNumber: {
        type: Number,
      },
    },
    doctorInfo: {
      name: {
        type: String,
      },
      contactNumber: {
        type: Number,
      },
    },
    totalAmt: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    paidAmt: {
      type: Number,
    },
    paymentMode: {
      type: String,
    },
    items: [],
    userId: {
      type: String,
    },
    storeId: {
      type: String,
    },
  },
  {
    collection: "sales",
    timestamps: true,
  }
);

let ItemsSchema = new Schema({
  itemId: {
    type: String,
  },
  quantity: {
    type: String,
  },
});

module.exports = mongoose.model("Sales", Sales);
