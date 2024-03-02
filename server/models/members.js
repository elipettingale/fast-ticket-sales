const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  reference: {
    required: true,
    type: String,
  },
  first_name: {
    required: true,
    type: String,
  },
  last_name: {
    required: true,
    type: String,
  },
  date_of_birth: {
    required: true,
    type: Object,
  },
  password: {
    required: true,
    type: String,
  },
  auth_token: {
    type: String,
  },
  has_expired: {
    type: Boolean,
  },
});

module.exports = mongoose.model("members", dataSchema);
