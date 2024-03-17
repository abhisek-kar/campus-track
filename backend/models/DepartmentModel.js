const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Parent name is requied"],
    enum: ["cse", "civil"],
    unique: true,
  },
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "admin",
  },
  faculties: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "faculty",
    },
  ],
});

module.exports = mongoose.model("Department", departmentSchema);
