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
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
  },
});

module.exports = mongoose.model("Interval", intervalSchema);
