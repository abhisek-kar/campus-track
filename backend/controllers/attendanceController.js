const AttendanceModel = require("../models/AttendanceModel");
const StudentModel = require("../models/StudentModel");

exports.createAttendanceController = async (req, res) => {
  try {
    const { id, date, status } = req.body;
    const student = await StudentModel.findOne({ _id: id });
    if (!student) {
      return res.status(404).json({
        success: true,
        message: "Student not found",
      });
    }
    const newAttendance = new AttendanceModel({ student: id, date, status });
    await newAttendance.save();
    return res.status(201).json({
      success: true,
      message: "Attendance created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error In attendance API",
    });
  }
};
exports.deleteAttendanceController = async (req, res) => {
  try {
    const { id, date } = req.body;
    const student = await StudentModel.findOne({ _id: id });

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student not found",
      });
    }

    const deletedAttendance = await AttendanceModel.findOneAndDelete({
      student: id,
      date,
    });

    if (!deletedAttendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found for the specified date",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in delete attendance API",
    });
  }
};
exports.updateAttendanceController = async (req, res) => {
  try {
    const { id, date, status } = req.body;
    const student = await StudentModel.findOne({ _id: id });

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student not found",
      });
    }

    const updatedAttendance = await AttendanceModel.findOneAndUpdate(
      { student: id, date },
      { $set: { status } },
      { new: true } // Return the modified document
    );

    if (!updatedAttendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found for the specified date",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      attendance: updatedAttendance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in update attendance API",
    });
  }
};
exports.getAllAttendanceController = async (req, res) => {
  try {
    const allAttendance = await AttendanceModel.find().populate("student");

    if (!allAttendance || allAttendance.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No attendance records found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance records retrieved successfully",
      attendance: allAttendance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in get all attendance API",
    });
  }
};
exports.getAttendanceByStudentIdController = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID format",
      });
    }

    const student = await StudentModel.findOne({ _id: studentId });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const attendanceDetails = await AttendanceModel.find({
      student: studentId,
    });

    return res.status(200).json({
      success: true,
      message: "Attendance details retrieved successfully",
      attendance: attendanceDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in get attendance by student ID API",
    });
  }
};
