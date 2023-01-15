const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Doctors = new Schema(
  {
    name: {
      type: String
    },
    contactNumber: {
      type: Number,
    }
  },
  {
    collection: "doctors",
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctors", Doctors);
