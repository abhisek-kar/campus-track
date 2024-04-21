const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "Smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "raja.bbsr001@gmail.com",
    pass: "huhs teqv ytbv yawr",
  },
});

// async..await is not allowed in global scope, must use a wrapper
// async function sendEmail({ to, subject, text, html }) {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"noreply" <raja.bbsr001@gmail.com>', // sender address
//     to,
//     subject,
//     text,
//     html,
//   });

//   return info;
// }
exports.sendEmail = async function ({ to, studentName }) {
  try {
    let subject = `Attendance Shortage Notification for ${studentName}`;
    let text = `Dear ${studentName},\n\nThis is to inform you that your attendance  is below the required threshold. Please take necessary actions to improve your attendance.\n\nRegards,\nGCE, Keonjhar`;
    let html = `<p>Dear ${studentName},</p><p>This is to inform you that your attendance is below the required threshold. Please take necessary actions to improve your attendance.</p><p>Regards,<br/>GCE, Keonjhar</p>`;

    let info = await transporter.sendMail({
      from: '"GCE, Keonjhar" <raja.bbsr001@gmail.com>',
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent successfully:", info);
    return info;
  } catch (error) {
    console.log("Email sending failed:", error);
    return error;
  }
};

exports.sendOtpEmail = async function (to, otp) {
  try {
    let subject = `OTP for Password Reset`;
    let text = `Your OTP for password reset is: ${otp}`;
    let html = `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`;

    let info = await transporter.sendMail({
      from: '"GCE, Keonjhar" <raja.bbsr001@gmail.com>',
      to,
      subject,
      text,
      html,
    });
    console.log("OTP Email sent successfully:", info);
    return {
      success: true,
    };
  } catch (error) {
    console.log("OTP Email sending failed:", error);
    return {
      success: false,
    };
  }
};
