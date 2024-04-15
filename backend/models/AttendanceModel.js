const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  attendance: [
    {
      course: {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
        required: true,
      },
      records: [
        {
          date: {
            type: Date,
            default: Date.now,
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
