const bcrypt = require("bcryptjs"); // Assuming you want to hash passwords before saving them
const StudentModel = require("../models/StudentModel");

// add student
exports.createStudentController = async (req, res) => {
  try {
    const { mail, regdNo } = req.body;

    // Check if the email and registration number are unique
    const existingStudent = await StudentModel.findOne({
      $or: [{ mail }, { regdNo }],
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message:
          "Student with the provided email or registration number already exists",
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new StudentModel({
      ...req.body,
      password: hashedPassword,
    });

    await newStudent.save();

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in createStudentController",
    });
  }
};

// delete student
exports.deleteStudentController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await StudentModel.findOneAndDelete({
      _id: id,
    });

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Student deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Student API",
    });
  }
};

// update student
exports.updateStudentController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student  not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Student details updated successfully`,
      student: updatedStudent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in student api",
    });
  }
};

// get all students
exports.getAllStudentsController = async (req, res) => {
  try {
    const allStudents = await StudentModel.find({});
    // .populate("department")
    // .populate("courses")
    // .populate("attendance");

    if (!allStudents || allStudents.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      students: allStudents,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in student api",
    });
  }
};

// get student details by id
exports.getStudentByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await StudentModel.findOne({ _id: id })
      .populate("department")
      .populate("courses")
      .populate("attendance");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Student retrieved successfully`,
      student: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in student api",
    });
  }
};
