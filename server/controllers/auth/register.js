import bcrypt from "bcryptjs";
import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";

// register
const registerController = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { user_mail: email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Already Registered, please Login", success: false });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      user_mail: email,
      user_password: hashedPassword,
      user_role: role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export default registerController;
