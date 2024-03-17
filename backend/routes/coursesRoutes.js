const express = require("express");
const {
  getAllCoursesController,
  getCourseByIdController,
  addCourseController,
  deleteCourseController,
  updateCourseController,
} = require("../controllers/courseController");
const { isAuthenticated } = require("../middlewares/middleware");

const router = express.Router();

//routes

// get all courses
router.get("/", isAuthenticated, getAllCoursesController);

// get  course  by course id
router.get("/:id", isAuthenticated, getCourseByIdController);

// add course
router.post("/", isAuthenticated, addCourseController);

// delete course
router.delete("/:id", isAuthenticated, deleteCourseController);

// update course
router.patch("/:id", isAuthenticated, updateCourseController);

module.exports = router;
