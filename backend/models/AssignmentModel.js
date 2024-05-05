const { isDate } = require("moment/moment");
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Faculty",
    required: true,
  },
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
    filename: String,
    mimetype: String,
    size: Number,
    path: String,
    uploadedAt: { type: Date, default: Date.now },
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  submitBy: {
    type: Date,
  },
  submissions: [
    {
      student: {
        type: mongoose.Schema.ObjectId,
      },
      answer: {
        type: String,
      },
      doc: {
        filename: String,
        mimetype: String,
        size: Number,
        path: String,
        uploadedAt: { type: Date, default: Date.now },
      },
      submittedOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Assignment", assignmentSchema);
