const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: "student",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
