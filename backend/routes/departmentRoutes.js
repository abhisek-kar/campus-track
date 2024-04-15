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

// get all departments
router.get("/", getAllDepartmentsController);

// get  department  by department id
router.get("/:id", getDepartmentByIdController);

// create department
router.post("/", createDepartmentController);

// delete departments
router.delete("/:id", deleteDepartmentController);

// update department
router.patch("/:id", updateDepartmentController);

module.exports = router;
