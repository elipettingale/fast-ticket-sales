const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  date: {
    required: true,
    type: String,
  },
  available: {
    type: Number,
  },
  department_code: {
    type: String,
  },
  nominal_code: {
    type: String,
  },
  remaining: {
    type: Number,
  },
  status: {
    type: String,
  },
  is_sold_out: {
    type: Boolean,
  },
});

module.exports = mongoose.model("events", dataSchema);
