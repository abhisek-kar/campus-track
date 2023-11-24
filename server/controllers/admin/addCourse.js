import { Courses } from "../../models/studentModel.js";

const addCourse = async (req, res) => {
  const { role } = req.user;
  try {
    // check if user is admin or not
    if (role !== "admin") {
      return res
        .status(401)
        .json({ message: "Don't have access to add course " });
    }
    const { courseCode, courseName } = req.body;
    //    check if course exists or not
    const existingCourse = await Courses.findOne({
      where: { course_code: courseCode },
    });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course Already Exists",
      });
    }
    await Courses.create({
      course_code: courseCode,
      course_name: courseName,
    });
    return res.status(201).json({
      success: true,
      message: "successfully Added Course",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
export default addCourse;
