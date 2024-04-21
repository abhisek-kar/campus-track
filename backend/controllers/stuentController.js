const bcrypt = require("bcryptjs"); // Assuming you want to hash passwords before saving them
const StudentModel = require("../models/StudentModel");
const AttendanceModel = require("../models/AttendanceModel");

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

//
exports.getStudentsByCourseSemDept = async (req, res) => {
  const { courseId, departmentId, semester } = req.body;

  try {
    // Find all students with specified department and semester
    const students = await StudentModel.find({
      department: departmentId,
      semester: semester,
    });

    if (!students || students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found for the specified department and semester",
      });
    }

    const studentIds = students.map((student) => student._id);

    // Find attendance records for the specified course and students
    const assignedStudents = await AttendanceModel.find({
      "attendance.course": courseId,
      student: { $in: studentIds },
    }).populate("student");
    // console.log(attendance);
    if (!assignedStudents) {
      return res.status(404).json({
        success: false,
        message: "No students assigned to the specified course",
      });
    }

    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      students: assignedStudents?.map((item) => {
        return {
          name: item?.student?.name,
          _id: item?.student?._id,
          regdNo: item?.student?.regdNo,
          mobile: item?.student?.mobile,
          year: item?.student?.year,
        };
      }),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving students by course",
    });
  }
};

exports.getStudentsByCourseSemDeptAttendanceStats = async (req, res) => {
  const { courseId, departmentId, semester } = req.body;
  console.log(req.body);
  try {
    // Find all students with specified department and semester
    const students = await StudentModel.find({
      department: departmentId,
      semester: semester,
    });

    if (!students || students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found for the specified department and semester",
      });
    }

    const studentIds = students.map((student) => student._id);

    // Find attendance records for the specified course and students
    const assignedStudents = await AttendanceModel.find({
      "attendance.course": courseId,
      student: { $in: studentIds },
    }).populate("student");

    if (!assignedStudents || assignedStudents.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students assigned to the specified course",
      });
    }

    // Calculate attendance statistics for each student
    const studentsWithStats = assignedStudents.map((item) => {
      const courseAttendance = item.attendance.find(
        (record) => String(record.course) === courseId
      );

      const totalAttendances = courseAttendance
        ? courseAttendance.records.length
        : 0;
      const totalPresent = courseAttendance
        ? courseAttendance.records.filter(
            (record) => record.status === "present"
          ).length
        : 0;
      const totalAbsent = courseAttendance
        ? courseAttendance.records.filter(
            (record) => record.status === "absent"
          ).length
        : 0;
      const totalSick = courseAttendance
        ? courseAttendance.records.filter((record) => record.status === "sick")
            .length
        : 0;

      return {
        name: item.student.name,
        _id: item.student._id,
        regdNo: item.student.regdNo,
        mobile: item.student.mobile,
        year: item.student.year,
        totalAttendances,
        totalPresent,
        totalAbsent,
        totalSick,
      };
    });

    res.status(200).json({
      success: true,
      message: "Attendance statistics fetched successfully",
      students: studentsWithStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving attendance statistics",
    });
  }
};
