const express = require("express");
const {
  getAllCoursesController,
  getCourseByIdController,
  addCourseController,
  deleteCourseController,
  updateCourseController,
  getAssignedCourseByIdController,
} = require("../controllers/courseController");
const { isAuthenticated } = require("../middlewares/middleware");

const router = express.Router();

//routes

// get all courses
router.get("/", getAllCoursesController);

// get  course  by course id
router.get("/:id", getCourseByIdController);

// get all courses  by student id
router.get("/assigned-courses/:studentId", getAssignedCourseByIdController);

// add course
router.post("/", addCourseController);

// delete course
router.delete("/:id", deleteCourseController);

// update course
router.patch("/:id", isAuthenticated, updateCourseController);

module.exports = router;
