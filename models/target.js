const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// mongoose require a schema, created only for get targets

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
});

module.exports = mongoose.model("Target", targetSchema);
