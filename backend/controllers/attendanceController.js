const { default: mongoose } = require("mongoose");
const AttendanceModel = require("../models/AttendanceModel");
const StudentModel = require("../models/StudentModel");

exports.createAttendanceController = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    // Check if the student and course IDs are valid ObjectId values
    if (
      !mongoose.Types.ObjectId.isValid(studentId) ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid student or course ID" });
    }

    // Create a new student-course association
    const studentCourse = new AttendanceModel({
      student: studentId,
      course: courseId,
    });

    // Save the student-course association
    await studentCourse.save();

    res.status(201).json({
      success: true,
      message: "Student-Course  created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred in Attendance API",
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
  const { studentId, courseId, date, status } = req.body;

  try {
    // Check if the student and course IDs are valid ObjectId values
    if (
      !mongoose.Types.ObjectId.isValid(studentId) ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid student or course ID" });
    }

    // Check if the status is valid
    if (!["present", "absent", "sick"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid attendance status" });
    }

    // Find the attendance document for the student
    let attendance = await AttendanceModel.findOne({ student: studentId });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found for the student",
      });
    }

    // Find the attendance record for the specified course
    let courseAttendance = attendance.attendance.find((item) =>
      item.course.equals(courseId)
    );

    if (!courseAttendance) {
      // If attendance for the course doesn't exist, create a new attendance record
      courseAttendance = {
        course: courseId,
        records: [{ date, status }],
      };
      attendance.attendance.push(courseAttendance);
    } else {
      // If attendance for the course exists, find or create a record for the specified date
      let attendanceRecord = courseAttendance.records.find(
        (record) => record.date.toDateString() === new Date(date).toDateString()
      );

      if (attendanceRecord) {
        // If attendance record for the date exists, update the status
        attendanceRecord.status = status;
      } else {
        // If attendance record for the date doesn't exist, create a new record
        attendanceRecord = { date, status };
        courseAttendance.records.push(attendanceRecord);
      }
    }

    // Save the updated attendance document
    await attendance.save();

    res
      .status(200)
      .json({ success: true, message: "Attendance updated successfully" });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating attendance",
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

exports.updateAttendanceBulk = async (req, res) => {
  const attendanceUpdates = req.body;

  try {
    // Validate the attendance updates array
    if (!Array.isArray(attendanceUpdates) || attendanceUpdates.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid attendance updates format" });
    }

    // Iterate through each attendance update
    for (const update of attendanceUpdates) {
      const { studentId, courseId, date, status } = update;

      // Check if the student and course IDs are valid ObjectId values
      if (
        !mongoose.Types.ObjectId.isValid(studentId) ||
        !mongoose.Types.ObjectId.isValid(courseId)
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid student or course ID" });
      }

      // Check if the status is valid
      if (!["present", "absent", "sick"].includes(status)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid attendance status" });
      }

      // Find the attendance document for the student
      let attendance = await Attendance.findOne({ student: studentId });

      if (!attendance) {
        return res.status(404).json({
          success: false,
          message: "Attendance record not found for the student",
        });
      }

      // Find the attendance record for the specified course
      let courseAttendance = attendance.attendance.find((item) =>
        item.course.equals(courseId)
      );

      if (!courseAttendance) {
        // If attendance for the course doesn't exist, create a new attendance record
        courseAttendance = {
          course: courseId,
          records: [{ date, status }],
        };
        attendance.attendance.push(courseAttendance);
      } else {
        // If attendance for the course exists, find or create a record for the specified date
        let attendanceRecord = courseAttendance.records.find(
          (record) =>
            record.date.toDateString() === new Date(date).toDateString()
        );

        if (attendanceRecord) {
          // If attendance record for the date exists, update the status
          attendanceRecord.status = status;
        } else {
          // If attendance record for the date doesn't exist, create a new record
          attendanceRecord = { date, status };
          courseAttendance.records.push(attendanceRecord);
        }
      }

      // Save the updated attendance document
      await attendance.save();
    }

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully for all students",
    });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating attendance",
    });
  }
};
exports.createAttendanceBulkController = async (req, res) => {
  const { studentId, courseIds } = req.body;

  try {
    // Check if the student ID is a valid ObjectId value
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid student ID" });
    }

    // Check if courseIds is an array and not empty
    if (!Array.isArray(courseIds) || courseIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid course IDs" });
    }

    // Create an array to store student-course associations
    const studentCourses = [];

    // Create student-course associations for each course ID
    for (const courseId of courseIds) {
      // Check if the course ID is a valid ObjectId value
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        console.warn(`Invalid course ID: ${courseId}`);
        continue; // Skip this course ID and continue with the next one
      }

      // Create a new student-course association
      const studentCourse = new AttendanceModel({
        student: studentId,
        course: courseId,
      });

      // Add the student-course association to the array
      studentCourses.push(studentCourse);
    }

    // Save all student-course associations
    await Promise.all(studentCourses.map((course) => course.save()));

    res.status(201).json({
      success: true,
      message: "Student-Course associations created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred in Attendance API",
    });
  }
};

// add courses to existing attendance
exports.addCoursesToExistingAttendance = async (req, res) => {
  try {
    const { studentId, courseIds } = req.body;
    console.log("Request Body:", req.body);

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid student ID" });
    }

    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    let attendance = await AttendanceModel.findOne({ student: studentId });
    if (!attendance) {
      attendance = new AttendanceModel({ student: studentId, attendance: [] });
    }

    for (const courseId of courseIds) {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        console.warn(`Invalid course ID: ${courseId}`);
        continue;
      }

      const existingCourse = attendance.attendance.find((course) =>
        course.course.equals(courseId)
      );
      if (!existingCourse) {
        attendance.attendance.push({ course: courseId, records: [] });
      }
    }

    console.log("Updated Attendance:", attendance);

    // Save the updated attendance record
    const savedAttendance = await attendance.save();

    console.log("Saved Attendance:", savedAttendance);

    res
      .status(200)
      .json({ success: true, message: "Courses added successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error adding courses to attendance" });
  }
};

// add attendance of a particular student
exports.addStudentAttendanceRecord = async (req, res) => {
  try {
    const { studentId, courseId, date, status } = req.body;

    // Check if the student ID and course ID are valid ObjectId values
    if (
      !mongoose.Types.ObjectId.isValid(studentId) ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid student or course ID" });
    }

    // Find the student by ID
    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Find the student's attendance record
    let attendance = await AttendanceModel.findOne({ student: studentId });
    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance record not found" });
    }

    // Find the course in the attendance record
    const courseIndex = attendance.attendance.findIndex((course) =>
      course.course.equals(courseId)
    );
    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Course not found in attendance record",
      });
    }

    // Check if a record already exists for the specified date
    const existingRecordIndex = attendance.attendance[
      courseIndex
    ].records.findIndex(
      (record) => record.date.toDateString() === new Date(date).toDateString()
    );
    if (existingRecordIndex !== -1) {
      // Update the existing record with the new status
      attendance.attendance[courseIndex].records[existingRecordIndex].status =
        status;
      await attendance.save();
    } else {
      // Add a new record for the specified date
      attendance.attendance[courseIndex].records.push({ date, status });
      await attendance.save();
    }
    res.status(200).json({
      success: true,
      message: "Attendance record added successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error adding attendance record" });
  }
};
// exports.addStudentAttendanceRecord = async (req, res) => {
//   try {
//     const { studentId, courseId, date, status } = req.body;

//     // Check if the student ID and course ID are valid ObjectId values
//     if (
//       !mongoose.Types.ObjectId.isValid(studentId) ||
//       !mongoose.Types.ObjectId.isValid(courseId)
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid student or course ID" });
//     }

//     // Find the student by ID
//     const student = await StudentModel.findById(studentId);
//     if (!student) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Student not found" });
//     }

//     // Find the student's attendance record
//     let attendance = await AttendanceModel.findOne({ student: studentId });
//     if (!attendance) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Attendance record not found" });
//     }

//     // Find the course in the attendance record
//     const courseIndex = attendance.attendance.findIndex((course) =>
//       course.course.equals(courseId)
//     );
//     if (courseIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found in attendance record",
//       });
//     }

//     // Check if a record already exists for the specified date
//     const existingRecordIndex = attendance.attendance[
//       courseIndex
//     ].records.findIndex(
//       (record) => record.date.toDateString() === new Date(date).toDateString()
//     );
//     if (existingRecordIndex !== -1) {
//       // Update the existing record with the new status
//       attendance.attendance[courseIndex].records[existingRecordIndex].status =
//         status;
//     } else {
//       // Add a new record for the specified date
//       attendance.attendance[courseIndex].records.push({ date, status });
//     }

//     // Save the updated attendance record
//     await attendance.save();

//     res.status(200).json({
//       success: true,
//       message: "Attendance record added or updated successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error adding or updating attendance record",
//     });
//   }
// };

exports.addStudentAttendanceRecordBulk = async (req, res) => {
  try {
    const { courseId, date, attendance } = req.body;

    // Check if the course ID is a valid ObjectId value
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid course ID" });
    }
    console.log(req.body);
    // Iterate through each attendance object in the array
    for (const record of attendance) {
      const { student, status } = record;

      // Check if the student ID is a valid ObjectId value
      if (!mongoose.Types.ObjectId.isValid(student)) {
        console.warn(`Invalid student ID: ${student}`);
        continue; // Skip this record and continue with the next one
      }

      // Find the student's attendance record
      const studentAttendance = await AttendanceModel.findOne({
        student: student,
      });
      if (!studentAttendance) {
        return res.status(404).json({
          success: false,
          message: "Student attendance record not found",
        });
      }
      const attendanceRecord = studentAttendance?.attendance?.find(
        (attendance) => attendance.course.equals(courseId)
      );

      // Check if a record already exists for the specified date
      const existingRecordIndex = attendanceRecord.records.findIndex(
        (record) => record.date.toDateString() === new Date(date).toDateString()
      );

      if (existingRecordIndex !== -1) {
        // Update the existing record with the new status
        attendanceRecord.records[existingRecordIndex].status = status;
      } else {
        // Add a new record for the specified date
        attendanceRecord.records.push({ date, status });
      }
      // Save the updated attendance record
      await studentAttendance.save();
    }

    res.status(200).json({
      success: true,
      message: "Attendance records added successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating attendance records" });
  }
};

exports.getStudentAttendanceStats = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Check if the student ID is a valid ObjectId value
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid student ID" });
    }

    // Find the student's attendance record
    const studentAttendance = await AttendanceModel.findOne({
      student: studentId,
    });
    if (!studentAttendance) {
      return res.status(404).json({
        success: false,
        message: "Student attendance record not found",
      });
    }

    // Initialize counts
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalSick = 0;
    let totalAttendances = 0;

    studentAttendance?.attendance?.forEach((course) => {
      totalAttendances += course.records.length;
      course.records.forEach((record) => {
        switch (record.status) {
          case "present":
            totalPresent++;
            break;
          case "absent":
            totalAbsent++;
            break;
          case "sick":
            totalSick++;
            break;
          default:
            break;
        }
      });
    });

    res.status(200).json({
      success: true,
      data: {
        totalPresent,
        totalAbsent,
        totalSick,
        totalAttendances,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching attendance stats" });
  }
};

exports.removeCoursesFromAttendance = async (req, res) => {
  try {
    const { studentId, courseIds } = req.body;

    // Check if the provided student ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid student ID" });
    }

    // Check if the provided course IDs are valid ObjectId values
    if (!courseIds.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid course ID(s)" });
    }

    // Find the attendance record for the student
    const attendanceRecord = await AttendanceModel.findOne({
      student: studentId,
    });
    if (!attendanceRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance record not found" });
    }

    // Remove the specified courses from the attendance record
    courseIds.forEach((courseId) => {
      attendanceRecord.attendance = attendanceRecord.attendance.filter(
        (course) => !course.course.equals(courseId)
      );
    });

    // Save the updated attendance record
    await attendanceRecord.save();

    res
      .status(200)
      .json({ success: true, message: "Courses removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing courses" });
  }
};

exports.getStudentAttendanceStatsForCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // Check if the student ID and course ID are valid ObjectId values
    if (
      !mongoose.Types.ObjectId.isValid(studentId) ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid student ID or course ID" });
    }

    // Find the student's attendance record
    const studentAttendance = await AttendanceModel.findOne({
      student: studentId,
      "attendance.course": courseId,
    });
    if (!studentAttendance) {
      return res.status(404).json({
        success: false,
        message: "Student attendance record not found for the specified course",
      });
    }

    // Extract attendance details for the specified course
    const courseAttendance = studentAttendance.attendance.find(
      (course) => String(course.course) === courseId
    );
    if (!courseAttendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance records not found for the specified course",
      });
    }

    // Extract and format attendance records with dates and statuses
    const attendanceDetails = courseAttendance.records.map((record) => ({
      date: record.date,
      status: record.status,
    }));

    res.status(200).json({
      message: "Attendance details fetched successfully",
      success: true,
      data: {
        attendanceDetails,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching attendance details" });
  }
};
