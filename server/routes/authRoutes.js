import express from "express";
import registerController from "../controllers/auth/register.js";
import loginController from "../controllers/auth/login.js";

// router Object
const router = express.Router();

//register || POST
router.post("/register", registerController);

//login || POST
router.post("/login", loginController);

export default router;
