const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Parent name is requied"],
  },

  address: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: "department",
    required: true,
  },
});

module.exports = mongoose.model("Parent", facultySchema);
