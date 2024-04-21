const express = require("express");
const {
  isAuthenticated,
  isAdmin,
  isFaculty,
} = require("../middlewares/middleware");
const {
  deleteAttendanceController,
  updateAttendanceController,
  getAllAttendanceController,
  getAttendanceByStudentIdController,
  createAttendanceController,
  createAttendanceBulkController,
  addCoursesToExistingAttendance,
  addStudentAttendanceRecord,
  addStudentAttendanceRecordBulk,
  getStudentAttendanceStats,
  removeCoursesFromAttendance,
  getStudentAttendanceStatsForCourse,
} = require("../controllers/attendanceController");

const router = express.Router();

//routes

// get all attendances
router.get("/", getAllAttendanceController);
// get attendance stats of a student
router.get("/stats/:studentId", getStudentAttendanceStats);

// get  attendance by student id
router.get("/:id", getAttendanceByStudentIdController);

// create attendance
router.post("/", createAttendanceController);
router.post("/bulk", createAttendanceBulkController);

//
router.post("/get-stats-course", getStudentAttendanceStatsForCourse);

// delete attendance
router.delete("/:id", deleteAttendanceController);

// update attendance
// router.patch("/", updateAttendanceController);
router.patch("/add-courses", addCoursesToExistingAttendance);
router.patch("/add-student-attendence", addStudentAttendanceRecord);
router.patch("/add-bulk-student-attendence", addStudentAttendanceRecordBulk);
router.patch("/revoke-course", removeCoursesFromAttendance);

module.exports = router;
