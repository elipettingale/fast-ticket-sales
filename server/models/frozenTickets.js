const { timeStamp } = require("console");
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  member: {
    required: true,
    type: String,
  },
  event: {
    required: true,
    type: String,
  },
  unfrozen_at: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("frozen_tickets", dataSchema);
