const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Parent name is requied"],
  },
  relation: {
    type: String,
    enum: ["father", "mother", "brother", "sister", "cousin", "other"],
    required: [true, "Relation required"],
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.ObjectId,
    ref: "student",
  },
});

module.exports = mongoose.model("Parent", parentSchema);
