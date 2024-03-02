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
});

module.exports = mongoose.model("purchased_tickets", dataSchema);
