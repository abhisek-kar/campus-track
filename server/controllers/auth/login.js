import bcrypt from "bcryptjs";
import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { user_mail: email } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.user_password);

    if (passwordMatch && role === user.user_role) {
      // Passwords match, generate a JWT token for individual roles
      let token = jwt.sign(
        {
          user_id: user.user_id,
          email: user.user_mail,
          role: user.user_role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Send the token in the response
      return res.status(200).json({
        message: "Login successful",
        success: true,
        token,
        id: user.user_id,
      });
    } else {
      // Passwords do not match or invalid role
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
export default loginController;
