const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  member: {
    required: true,
    type: String,
  },
  member_name: {
    required: true,
    type: String,
  },
  total: {
    required: true,
    type: Number,
  },
  intent: {
    type: String,
  },
  secret: {
    type: String,
  },
  details: {
    type: Object,
  },
  frozen_tickets: {
    type: Array,
  },
  purchased_tickets: {
    type: Array,
  },
  paid_at: {
    type: Date,
  },
  description: {
    type: Array,
  }
});

module.exports = mongoose.model("entries", dataSchema);
