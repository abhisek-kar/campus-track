const express = require("express");
const { isAuthenticated, isAdmin } = require("../middlewares/middleware");
const {
  createStudentController,
  deleteStudentController,
  updateStudentController,
  getAllStudentsController,
  getStudentByIdController,
} = require("../controllers/stuentController");

const router = express.Router();

//routes

// get all students
router.get("/", getAllStudentsController);
// router.get("/", isAuthenticated, getAllStudentsController);

// get  student details by student id
router.get("/:id", isAuthenticated, getStudentByIdController);

// add attendance
router.post("/", isAuthenticated, isAdmin, createStudentController);

// delete attendance
router.delete("/:id", isAuthenticated, isAdmin, deleteStudentController);

// update attendance
router.patch("/:id", updateStudentController);

module.exports = router;
