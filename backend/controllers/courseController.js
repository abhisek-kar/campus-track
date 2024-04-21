const AttendanceModel = require("../models/AttendanceModel");
const CourseModel = require("../models/CourseModel");
const StudentModel = require("../models/StudentModel");

exports.addCourseController = async (req, res) => {
  try {
    console.log(req.body);
    const { code } = req.body;
    const existingCourse = await CourseModel.findOne({ code: code });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: `Course with ID ${code} already exists`,
      });
    }

    const newCourse = new CourseModel(req.body);
    await newCourse.save();

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in addCourseController",
    });
  }
};

// delete course
exports.deleteCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const deletedCourse = await CourseModel.findOneAndDelete({ courseId });

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: `Course not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Course deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in course api",
    });
  }
};

// update course
exports.updateCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const updatedCourse = await CourseModel.findOneAndUpdate(
      { courseId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: `Course not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Course updated successfully`,
      course: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in updateCourseController",
    });
  }
};
// get all courses
exports.getAllCoursesController = async (req, res) => {
  try {
    const allCourses = await CourseModel.find();

    if (!allCourses || allCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      courses: allCourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in course api",
    });
  }
};

// get course by id
exports.getCourseByIdController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await CourseModel.findOne({ courseId }).populate(
      "courseFaculty"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Course retrieved successfully`,
      course: course,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in course api",
    });
  }
};

// get all assigned courses by student id
exports.getAssignedCourseByIdController = async (req, res) => {
  try {
    const { studentId } = req.params;

    let user = await StudentModel.findOne({ _id: studentId });
    if (!user) {
      return res.status(404).json({
        success: true,
        message: ` student not found`,
        course: course,
      });
    }
    let attendance = await AttendanceModel.findOne({
      student: studentId,
    }).populate({
      path: "attendance.course",
      select: "_id name code", // Include only the necessary fields
    });

    return res.status(200).json({
      success: true,
      message: `Courses retrieved successfully`,
      courses: attendance
        ? attendance.attendance.map((item) => item.course)
        : [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in course api",
    });
  }
};
