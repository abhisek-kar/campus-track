const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Course name is requied"],
    unique: true,
  },
  code: {
    type: String,
    required: [true, "Course id is requied"],
    unique: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
