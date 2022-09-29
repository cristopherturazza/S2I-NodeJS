const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const targetSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  intervals: {
    type: [Schema.Types.ObjectId],
  },
});

module.exports = mongoose.model("Target", targetSchema);
