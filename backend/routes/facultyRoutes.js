const express = require("express");
const { isAuthenticated, isAdmin } = require("../middlewares/middleware");
const {
  getAllFacultyController,
  getFacultyByIdController,
  createFacultyController,
  deleteFacultyController,
  updateFacultyController,
} = require("../controllers/facultyController");

const router = express.Router();

//routes

// get all faculty
router.get("/", isAuthenticated, isAdmin, getAllFacultyController);

// get  faculty details by student id
router.get("/:id", isAuthenticated, isAdmin, getFacultyByIdController);

// add faculty
router.post("/", isAuthenticated, isAdmin, createFacultyController);

// delete faculty
router.delete("/:id", isAuthenticated, isAdmin, deleteFacultyController);

// update faculty
router.patch("/:id", isAuthenticated, isAdmin, updateFacultyController);

module.exports = router;
