const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    unique: true,
  },
  attendance: [
    {
      course: {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
        unique: true,
      },
      records: [
        {
          date: {
            type: Date,
            default: Date.now,
            unique: true,
          },

          status: {
            type: String,
            enum: ["present", "absent", "sick"],
            default: "absent",
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
