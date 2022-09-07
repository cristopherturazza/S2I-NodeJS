const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const intervalSchema = new Schema({
  startdate: {
    type: Date,
    default: Date.now,
  },
  enddate: {
    type: Date,
    required: true,
  },
  userid: {
    type: mongoose.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Interval", intervalSchema);
