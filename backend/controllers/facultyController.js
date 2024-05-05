const { default: mongoose } = require("mongoose");
const CourseModel = require("../models/CourseModel");
const FacultyModel = require("../models/FacultyModel");

// create faculty
exports.createFacultyController = async (req, res) => {
  try {
    const { mail, regdNo } = req.body;

    // Check if the email and registration number are unique
    const existingFaculty = await FacultyModel.findOne({
      $or: [{ mail }, { regdNo }],
    });

    if (existingFaculty) {
      return res.status(400).json({
        success: false,
        message: "Faculty already exists",
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newFaculty = new FacultyModel({
      ...req.body,
      password: hashedPassword,
    });

    await newFaculty.save();

    return res.status(201).json({
      success: true,
      message: "Faculty created successfully",
      faculty: newFaculty,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Faculty API",
    });
  }
};
// delete faculty
exports.deleteFacultyController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFaculty = await FacultyModel.findOneAndDelete({
      _id: id,
    });

    if (!deletedFaculty) {
      return res.status(404).json({
        success: false,
        message: `Faculty not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Faculty deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in faculty api",
    });
  }
};

// update faculty
exports.updateFacultyController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFaculty = await FacultyModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true } // Return the modified document
    );

    if (!updatedFaculty) {
      return res.status(404).json({
        success: false,
        message: `Faculty not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Faculty updated successfully`,
      faculty: updatedFaculty,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in faculty Api",
    });
  }
};

// get all faculty details
exports.getAllFacultyController = async (req, res) => {
  try {
    const allFaculty = await FacultyModel.find().populate("");

    if (!allFaculty || allFaculty.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No faculty members found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Faculty members retrieved successfully",
      faculty: allFaculty,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in faculty api",
    });
  }
};

// get faculty details by id
exports.getFacultyByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await FacultyModel.findOne({ _id: id });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: `Faculty not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Faculty retrieved successfully`,
      faculty: faculty,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in faculty api",
    });
  }
};

// add course to faculty
// exports.addCourseToFaculty = async (req, res) => {
//   const { facultyId, courseId } = req.body;

//   // Validate input IDs
//   if (
//     !mongoose.Types.ObjectId.isValid(facultyId) ||
//     !mongoose.Types.ObjectId.isValid(courseId)
//   ) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid faculty or course ID" });
//   }

//   try {
//     // Find the faculty by ID
//     const faculty = await FacultyModel.findById(facultyId);
//     if (!faculty) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Faculty not found" });
//     }

//     // Find the course by ID
//     const course = await CourseModel.findById(courseId);
//     if (!course) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Course not found" });
//     }

//     // Check if the faculty already has the course
//     if (faculty.courses && faculty.courses.includes(courseId)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Faculty already has this course" });
//     }

//     // Check if any other faculty has the same course
//     const otherFacultyWithCourse = await FacultyModel.findOne({
//       courses: courseId,
//       _id: { $ne: facultyId },
//     });
//     if (otherFacultyWithCourse) {
//       return res.status(400).json({
//         success: false,
//         message: "Another faculty already has this course",
//       });
//     }

//     // Add the course to the faculty's courses array
//     faculty.courses.push(courseId);
//     await faculty.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Course added to faculty successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error adding course to faculty" });
//   }
// };
exports.addCourseToFaculty = async (req, res) => {
  const { facultyId, courseId, departmentId, semester } = req.body;

  // Validate input IDs
  if (
    !mongoose.Types.ObjectId.isValid(facultyId) ||
    !mongoose.Types.ObjectId.isValid(courseId) ||
    !mongoose.Types.ObjectId.isValid(departmentId)
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid IDs provided" });
  }

  try {
    // Check if the course is already assigned to the faculty
    const faculty = await FacultyModel.findById(facultyId);
    if (!faculty) {
      return res
        .status(404)
        .json({ success: false, message: "Faculty not found" });
    }

    const existingCourse = faculty.courses.find(
      (course) =>
        course.course.toString() === courseId &&
        course.department.toString() === departmentId
    );

    if (existingCourse) {
      return res.status(200).json({
        success: true,
        message: "Course already assigned to this faculty",
      });
    }

    // Create a new course object to add to the faculty's courses array
    const newCourse = {
      department: departmentId,
      semester,
      course: courseId,
    };

    // Update the faculty document to add the new course
    const updatedFaculty = await FacultyModel.findByIdAndUpdate(
      facultyId,
      { $push: { courses: newCourse } },
      { new: true }
    );

    if (!updatedFaculty) {
      return res
        .status(404)
        .json({ success: false, message: "Faculty not found" });
    }

    res.status(200).json({
      success: true,
      message: "Course added to faculty successfully",
      updatedFaculty,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error adding course to faculty" });
  }
};

// get all courses of a faculty of all department
exports.getAllCourseDetails = async (req, res) => {
  try {
    // Get the faculty ID from the request
    const { facultyId } = req.params;

    // Check if the faculty ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid faculty ID" });
    }

    // Query the Faculty model to find the faculty by ID
    const faculty = await FacultyModel.findById(facultyId);

    if (!faculty) {
      return res
        .status(404)
        .json({ success: false, message: "Faculty not found" });
    }

    // Check if the course is already added to the faculty's courses array
    // if (faculty.courses && faculty.courses.length > 0) {
    //   const courseExists = faculty.courses.some((course) =>
    //     course.course.equals(courseId)
    //   );
    //   if (courseExists) {
    //     return res
    //       .status(200)
    //       .json({ success: true, message: "Course already added" });
    //   }
    // }

    // Populate the courses array with department and course details
    await faculty.populate({
      path: "courses",
      populate: [
        { path: "department", model: "Department" }, // Populate department
        { path: "course", model: "Course" }, // Populate course
      ],
    });

    // Return the populated faculty data in the response
    res.status(200).json({ success: true, faculty });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching course details" });
  }
};

// Controller to get all course details of a specific department for a faculty
exports.getCoursesByDepartment = async (req, res) => {
  try {
    // Get the faculty ID and department ID from the request query string or route parameters
    const { facultyId, departmentId } = req.body; // Assuming they are passed as query parameters

    // Check if the faculty ID and department ID are valid ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(facultyId) ||
      !mongoose.Types.ObjectId.isValid(departmentId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid faculty ID or department ID",
      });
    }

    // Query the Faculty model to find the faculty by ID and populate only the courses that belong to the specified department
    const faculty = await FacultyModel.findById(facultyId)
      .populate({
        path: "courses",
        match: { department: departmentId }, // Only populate courses from the specified department
        populate: { path: "course", model: "Course" }, // Populate course details
      })
      .exec();

    if (!faculty) {
      return res
        .status(404)
        .json({ success: false, message: "Faculty not found" });
    }

    // Return the populated faculty data with courses from the specified department
    res.status(200).json({ success: true, faculty });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching course details" });
  }
};

// revoke course from faculty
exports.revokeCourseFromFaculty = async (req, res) => {
  const { facultyId, courseId, departmentId } = req.body;
  console.log(req.body);
  // Validate input IDs
  if (
    !mongoose.Types.ObjectId.isValid(facultyId) ||
    !mongoose.Types.ObjectId.isValid(courseId) ||
    !mongoose.Types.ObjectId.isValid(departmentId)
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid IDs provided" });
  }

  try {
    // Check if the faculty exists
    const faculty = await FacultyModel.findById(facultyId);
    // console.log(faculty);
    if (!faculty) {
      return res
        .status(404)
        .json({ success: false, message: "Faculty not found" });
    }

    console.log("Faculty Courses:", faculty.courses);

    // Check if the course to revoke exists in the faculty's courses
    const courseIndex = faculty?.courses?.findIndex(
      (item) =>
        item?.course.toString() === courseId &&
        item?.department.toString() === departmentId
    );

    // console.log("Course Index:", courseIndex);

    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Course not found for specified faculty",
      });
    }

    // Remove the course from the courses array using splice or filter
    faculty.courses.splice(courseIndex, 1);

    // Save the updated faculty document
    await faculty.save();

    res.status(200).json({
      success: true,
      message: "Course revoked from faculty successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error revoking course from faculty" });
  }
};
