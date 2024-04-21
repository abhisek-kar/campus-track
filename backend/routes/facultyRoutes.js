const express = require("express");
const { isAuthenticated, isAdmin } = require("../middlewares/middleware");
const {
  getAllFacultyController,
  getFacultyByIdController,
  createFacultyController,
  deleteFacultyController,
  updateFacultyController,
  addCourseToFaculty,
  getCoursesOfFaculty,
  getCoursesByDepartment,
  getAllCourseDetails,
  revokeCourseFromFaculty,
} = require("../controllers/facultyController");

const router = express.Router();

//routes

// get all faculty
router.get("/", getAllFacultyController);

// get  faculty details by  id
router.get("/:id", getFacultyByIdController);

// add faculty
router.post("/", createFacultyController);

// add course to faculty
router.patch("/add-course", addCourseToFaculty);

// get all courses of faculties
router.get("/courses/:facultyId", getAllCourseDetails);

// get all courses of specific department
router.post("/dept-courses", getCoursesByDepartment);

// remove course from faculty
router.patch("/delete-course", revokeCourseFromFaculty);

// delete faculty
router.delete("/:id", deleteFacultyController);

// update faculty
router.patch("/:id", updateFacultyController);

module.exports = router;
