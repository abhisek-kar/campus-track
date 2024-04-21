const express = require("express");
const {
  registerController,
  loginController,
  resetPasswordOtpRequest,
  otpValidationAndUpdatePassword,
} = require("../controllers/authControllers.js");

const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// reset password otp
router.patch("/otp-request", resetPasswordOtpRequest);

// reset password
router.patch("/reset-password", otpValidationAndUpdatePassword);

module.exports = router;
