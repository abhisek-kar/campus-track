const CourseModel = require("../models/CourseModel");

exports.addCourseController = async (req, res) => {
  try {
    const { courseId } = req.body;
    const existingCourse = await CourseModel.findOne({ courseId });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: `Course with ID ${courseId} already exists`,
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
    const allCourses = await CourseModel.find().populate("courseFaculty");

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
