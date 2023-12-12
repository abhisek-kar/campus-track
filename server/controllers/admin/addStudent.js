import { Student } from "../../models/studentModel.js";

const addStudent = async (req, res) => {
  const { role } = req.user;
  try {
    // check if user is admin or not
    if (role !== "admin") {
      return res
        .status(401)
        .json({ message: "Don't have access to add student " });
    }
    const {
      studentId,
      StudentMail,
      studentName,
      studentAddress,
      studentEnrollDate,
    } = req.body;
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export default addStudent;
