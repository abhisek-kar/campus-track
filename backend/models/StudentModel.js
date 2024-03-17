const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name is requied"],
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  regdNo: {
    type: String,
    require: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },

  department: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "department",
  },
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "courses",
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
