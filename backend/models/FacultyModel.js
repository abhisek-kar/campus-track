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
  // department: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Department",
  //   required: true,
  // },
  courses: [
    {
      department: {
        type: mongoose.Schema.ObjectId,
        ref: "Department",
        // required: true,
      },
      semester: {
        type: String,
        // required: true,
        enum: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
      },
      course: {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
        unique: true,
      },
    },
  ],
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

module.exports = mongoose.model("Faculty", facultySchema);
