const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Admin name is requied"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Department",
  },
  resetPasswordOtp: {
    otp: {
      type: String,
      default: null,
    },
    expiry: {
      type: Date,
      default: null,
    },
  },
});

module.exports = mongoose.model("Admin", adminSchema);
