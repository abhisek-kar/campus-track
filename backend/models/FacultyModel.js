const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Faculty name is requied"],
  },

  address: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: "Department",
    required: true,
  },
});

module.exports = mongoose.model("Faculty", facultySchema);
