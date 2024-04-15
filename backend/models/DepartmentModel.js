const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Parent name is requied"],
    enum: [
      "CSE",
      "CIVIL",
      "MECHANICAL",
      "MINING",
      "METALLURGY",
      "ELECTRICAL",
      "MINERAL",
    ],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Parent name is requied"],
    enum: [
      "COMPUTER SCIENCE AND ENGINEERING",
      "CIVIL ENGINEERING",
      "MECHANICAL ENGINEERING",
      "MINING ENGINEERING",
      "METALLURGICAL & MATERIALS ENGINEERING",
      "ELECTRICAL ENGINEERING",
      "MINERAL ENGINEERING",
    ],
    unique: true,
  },
});

module.exports = mongoose.model("Department", departmentSchema);
