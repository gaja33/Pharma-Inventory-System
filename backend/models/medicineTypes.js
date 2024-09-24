const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let MedicineTypes = new Schema(
  {
    typeName: {
      type: String,
      unique: true,
    },
    userId: {
      type: String,
    },
    storeId: {
      type: String,
    },
  },
  {
    collection: "medicineTypes",
    timestamps: true,
  }
);

module.exports = mongoose.model("MedicineType", MedicineTypes);
