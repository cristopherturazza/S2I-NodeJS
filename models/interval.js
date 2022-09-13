const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const intervalSchema = new Schema({
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  startdate: {
    type: Date,
    default: Date.now,
  },
  enddate: {
    type: Date,
    required: true,
  },
  target: {
    type: mongoose.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Interval", intervalSchema);
