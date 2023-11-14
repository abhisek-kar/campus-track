import bcrypt from "bcryptjs";
import db from "../configs/dbconfig.js";

export const registerController = async (req, res) => {
  let { username, userpassword, role } = req.body;

  // check the user is already registered or not
  let existingUser = await checkExistingUser("tab", "user_name", user_name);
  if (existingUser) {
    res.status(400).json({
      success: false,
      message: "Already Registered",
    });
  } else {
    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(user_password, salt);
    let sql = "INSERT INTO tab (user_name, user_password) VALUES (?, ?)";
    db.query(sql, [user_name, hashedPassword], (error, result) => {
      if (error) {
        res.status(500).json({
          success: "false",
          message: "Registration Failed ",
          error,
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Registration Successful",
        });
      }
    });
  }
};

// loogin controller
export const loginController = async (req, res) => {
  let { user_name, user_password } = req.body;
  console.log("first");

  //checking user already registered or not
  let existingUser = await checkExistingUser("tab", "user_name", user_name);
  if (!existingUser) {
    res.status(400).json({
      success: false,
      message: "Not Registered Yet! please Register ",
    });
  } else {
    db.query(
      "SELECT user_password FROM tab WHERE user_name = ?",
      [user_name],
      (error, result) => {
        if (error) {
          res.status(500).json({
            success: "false",
            message: "Login Failed ",
            error,
          });
        } else {
          let flag = bcrypt.compareSync(user_password, result[0]);
          if (!flag) {
            res.status(500).json({
              success: "false",
              message: "Invalid Credential ",
            });
          }
          res.status(201).json({
            success: true,
            message: "Login Successful",
          });
        }
      }
    );
  }
};

// Helper function to check existing user
const checkExistingUser = async (table, key, value) => {
  const [rows] = await db.query(
    `SELECT * FROM ${table} WHERE ${key} = ${value}`
  );
  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
};
