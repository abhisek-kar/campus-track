const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, "Course name is requied"],
  },
  courseId: {
    type: String,
    required: [true, "Course id is requied"],
    unique: true,
  },
  courseFaculty: {
    type: mongoose.Schema.ObjectId,
    ref: "faculty",
    default: "N/A",
  },
});

module.exports = mongoose.model("Course", courseSchema);
