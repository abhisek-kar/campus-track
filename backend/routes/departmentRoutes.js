const express = require("express");
const { isAdmin, isAuthenticated } = require("../middlewares/middleware");
const {
  getAllDepartmentsController,
  getDepartmentByIdController,
  createDepartmentController,
  deleteDepartmentController,
  updateDepartmentController,
} = require("../controllers/departmentController");

const router = express.Router();

//routes

// get all courses
router.get("/", isAuthenticated, getAllDepartmentsController);

// get  course  by course id
router.get("/:id", isAuthenticated, getDepartmentByIdController);

// create course
router.post("/", isAuthenticated, createDepartmentController);

// delete course
router.delete("/:id", isAuthenticated, deleteDepartmentController);

// update course
router.patch("/:id", isAuthenticated, updateDepartmentController);

module.exports = router;
