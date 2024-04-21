const { sendEmail } = require("../configs/nodemailer");

exports.sendMail = async (req, res) => {
  try {
    let info = await sendEmail(req.body);
    res.json(info);
  } catch (error) {
    console.log(error);
    res.send("errors");
  }
};
