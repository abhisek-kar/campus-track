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
router.get("/", isAuthenticated, isFaculty, getAllAttendanceController);

// get  attendance by student id
router.get(
  "/:id",
  isAuthenticated,
  isFaculty,
  getAttendanceByStudentIdController
);

// create attendance
router.post("/", isAuthenticated, isFaculty, createAttendanceController);

// delete attendance
router.delete("/:id", isAuthenticated, isFaculty, deleteAttendanceController);

// update attendance
router.patch("/:id", isAuthenticated, isFaculty, updateAttendanceController);

module.exports = router;
