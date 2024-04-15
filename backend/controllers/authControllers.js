const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/AdminModel");
const FacultyModel = require("../models/FacultyModel");
const StudentModel = require("../models/StudentModel");

// register controller
exports.registerController = async (req, res) => {
  try {
    console.log(req.body);
    const { role, email, password } = req.body;
    // check existing user
    let user;
    if (role === "admin") {
      user = await AdminModel.findOne({ email: email });
    } else if (role === "faculty") {
      user = await FacultyModel.findOne({ email: email });
    } else if (role === "student") {
      user = await StudentModel.findOne({ email: email });
    }
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // hash password before save
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser;
    if (role === "admin") {
      newUser = new AdminModel({
        ...req.body,
        password: hashedPassword,
      });
      await newUser.populate("department");

      await newUser.save();
    } else if (role === "faculty") {
      newUser = new FacultyModel({
        ...req.body,
        password: hashedPassword,
      });
      await newUser.save();
    } else {
      newUser = new StudentModel({
        ...req.body,
        password: hashedPassword,
      });
      await newUser.save();
    }
    // create new user

    return res.status(201).json({
      success: true,
      message: `${role} Created Successfully`,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.mail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists, please use a different email",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error In Register API",
    });
  }
};

// Login Controller
exports.loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    //validfatuion
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }
    let user;
    if (role === "admin") {
      user = await AdminModel.findOne({ email }).populate("department");
    } else if (role === "faculty") {
      user = await FacultyModel.findOne({ email }).populate("department");
    } else {
      user = await StudentModel.findOne({ email }).populate("department");
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, please contact admin",
      });
    }
    // compare password
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // generate jwt token
    const token = jwt.sign(
      { id: user.id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // send token with cookies
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expiration time 7 days
      secure: process.env.NODE_ENV === "production",
    });
    user.password = undefined;
    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      user,
      role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In Login API",
    });
  }
};

// Logout controller
exports.logoutController = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// reset Password request
exports.resetPasswordRequestController = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();

    // Also set token in email
    const resetPageLink =
      "http://localhost:3000/reset-password?token=" + token + "&email=" + email;
    const subject = "reset password for e-commerce";
    const html = `<button>Click <a href='${resetPageLink}'>here</a> to Reset Password</button>`;

    // lets send email and a token in the mail body so we can verify that user has clicked right link

    if (email) {
      const response = await sendMail({ to: email, subject, html });
      res.json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};

exports.resetPasswordController = async (req, res) => {
  const { email, password, token } = req.body;

  const user = await UserModel.findOne({
    email: email,
    resetPasswordToken: token,
  });
  if (user) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();
        const subject = "password successfully reset for e-commerce";
        const html = `<p>Successfully able to Reset Password</p>`;
        if (email) {
          const response = await sendMail({ to: email, subject, html });
          res.json(response);
        } else {
          res.sendStatus(400);
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
};
