const { isDate } = require("moment/moment");
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Department",
    required: true,
  },
  semester: {
    type: String,
    required: true,
    enum: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
  },
  course: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Course",
    required: true,
  },
  task: {
    type: String,
  },
  document: {
    data: Buffer, // Binary data of the document
    contentType: String, // MIME type of the document (e.g., "image/jpeg", "application/pdf")
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  submitBy: {
    type: Date,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
