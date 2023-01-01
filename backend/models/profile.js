const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Profile = new Schema(
  {
    storeName: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    storeAddress: {
      type: String,
    },
    state: {
      type: String,
    },
    gstin: {
      type: String,
    },
    drugLicense: {
      type: String,
    },
    jurisdiction: {
      type: String,
    },
    billPrefix: {
      type: String,
    },
    previousBillCount: {
      type: Number,
    },
  },
  {
    collection: "profile",
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", Profile);
