const express = require("express");
const { isAuthenticated } = require("../middlewares/middleware");
const {
  getAllAdminsController,
  getAdminByIdController,
  createAdminController,
  deleteAdminController,
  updateAdminController,
} = require("../controllers/adminController");

const router = express.Router();

//routes

// get all admins
router.get("/", isAuthenticated, getAllAdminsController);

// get  admin details by admin id
router.get("/:id", isAuthenticated, getAdminByIdController);

// create admin
router.post("/", createAdminController);

// delete admin
router.delete("/:id", isAuthenticated, deleteAdminController);

// update admin
router.patch("/:id", isAuthenticated, updateAdminController);

module.exports = router;
