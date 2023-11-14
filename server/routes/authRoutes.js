import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

// router Object
const router = express.Router();

//register || POST
router.post("/register", registerController);

//login || POST
router.post("/login", loginController);

export default router;
