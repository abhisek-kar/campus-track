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
} = require("../controllers/attendanceController");

const router = express.Router();

//routes

// get all attendances
router.get("/", getAllAttendanceController);

// get  attendance by student id
router.get("/:id", getAttendanceByStudentIdController);

// create attendance
router.post("/", createAttendanceController);

// delete attendance
router.delete("/:id", deleteAttendanceController);

// update attendance
router.patch("/:id", updateAttendanceController);

module.exports = router;
