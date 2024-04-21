const moment = require("moment");

// Function to generate OTP
exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Function to generate OTP expiry time (5 minutes from now)
exports.generateExpiryTime = () => {
  return moment().add(5, "minutes").toDate();
};
