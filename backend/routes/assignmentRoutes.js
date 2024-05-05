const express = require("express");
const {
  createAssignment,
  getAssignmentsByFacultyId,
} = require("../controllers/AssignmentController");
const multer = require("multer");
const AssignmentModel = require("../models/AssignmentModel");
const StudentModel = require("../models/StudentModel");
const path = require("path");
const router = express.Router();
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder where files will be stored
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded file
    // Use Date.now() to ensure files have unique names
    cb(null, "campus-track" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// //routes
router.post(
  "/create-assignment",
  upload.single("doc"), // Assuming the file field in the form is named "doc"
  async (req, res) => {
    try {
      const { courseId, departmentId, semester, task, submitBy, facultyId } =
        req.body;
      console.log("Uploaded file:", req.file); // Log the uploaded file details

      // Check if a file was uploaded
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }

      // Create a new assignment object
      const newAssignment = new AssignmentModel({
        faculty: facultyId,
        department: departmentId, // Assuming departmentId is passed from the form
        semester,
        course: courseId, // Assuming courseId is passed from the form
        task,
        document: {
          filename: req.file.filename,
          mimetype: req.file.mimetype,
          size: req.file.size,
          path: req.file.path,
        },
        submitBy: new Date(submitBy), // Assuming submitBy is a date string
      });

      // Save the assignment to the database
      const savedAssignment = await newAssignment.save();

      res.status(201).json({
        success: true,
        message: "Assignment created successfully",
        assignment: savedAssignment,
      });
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({
        success: false,
        message: "Error creating assignment",
        error: error.message,
      });
    }
  }
);

// // get all assignments by facultyid
// router.get("/:facultyId", getAssignmentsByFacultyId);

// Initialize Multer with storage configuration
// Controller to upload a file for an assignment
router.post("/upload-file", upload.single("doc"), async (req, res) => {
  try {
    const { courseId, departmentId, semester, task, submitBy, facultyId } =
      req.body;
    console.log("Uploaded file:", req.file); // Log the uploaded file details

    // Check if a file was uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Create a new assignment object
    const newAssignment = new AssignmentModel({
      faculty: facultyId,
      department: departmentId, // Assuming departmentId is passed from the form
      semester,
      course: courseId, // Assuming courseId is passed from the form
      task,

      document: {
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
      },

      submitBy: new Date(submitBy), // Assuming submitBy is a date string
    });

    // Save the assignment to the database
    const savedAssignment = await newAssignment.save();

    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      assignment: savedAssignment,
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json({
      success: false,
      message: "Error creating assignment",
      error: error.message,
    });
  }
});

// Controller to download a file for an assignment
router.get("/faculty-assignments/:facultyId", async (req, res) => {
  const { facultyId } = req.params;
  try {
    // Fetch all assignments from the database
    const assignments = await AssignmentModel.find({
      faculty: facultyId,
    }).populate("department course");
    assignments.forEach((item) => {
      item.document = undefined;
      item.submissions = undefined;
      item.faculty = undefined;
    });
    // Return the assignments as a JSON response
    res.status(200).json({ success: true, assignments });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching assignments",
      error: error.message,
    });
  }
});

router.get("/get-assignment-doc/:assignmentId", async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    // Fetch the assignment from the database
    const assignment = await AssignmentModel.findById(assignmentId);
    if (!assignment || !assignment.document) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment or file not found" });
    }

    // Set the file path
    const filePath = path.join(
      __dirname,
      "./uploads",
      assignment.document.filename
    ); // Adjust the uploads directory path

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ success: false, message: "File not found on the server" });
    }

    // Send the file using sendFile
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).json({
      success: false,
      message: "Error sending file",
      error: error.message,
    });
  }
});

router.get("/get-submission-details/:assignmentId", async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;

    // Find the assignment by ID and populate the submissions field
    const assignment = await AssignmentModel.findById(assignmentId);

    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    const submissions = await Promise.all(
      assignment.submissions?.map(async (item) => {
        let student = await StudentModel.findOne({ _id: item?.student });

        return {
          student: {
            name: student?.name,
            _id: student?._id,
            regdNo: student?.regdNo,
          },
          submittedOn: item?.submittedOn,
          answer: item?.answer,
          assignmentId,
        };
      })
    );

    res.status(200).json({ success: true, submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching submissions",
    });
  }
});

router.patch("/submit-assignment", upload.single("doc"), async (req, res) => {
  try {
    const { studentId, submitBy, answer, assignmentId } = req.body;

    // Check if a file was uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Find the assignment by ID to check submitBy date
    const assignment = await AssignmentModel.findById(assignmentId);

    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    const currentDate = new Date();
    const submitByDate = new Date(submitBy);

    if (currentDate > submitByDate) {
      return res
        .status(400)
        .json({ success: false, message: "Submission date has passed" });
    }

    // Check if submission already exists for the provided studentId
    const existingSubmission = assignment.submissions.find(
      (submission) => submission.student.toString() === studentId
    );

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "Submission already exists for this student",
      });
    }

    // Add submission to submissions array
    assignment.submissions.push({
      student: studentId,
      doc: {
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
      },
      submittedOn: currentDate,
      answer: answer,
    });

    // Save the updated assignment
    await assignment.save();

    res.status(201).json({ success: true, message: "Submission successful" });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting assignment",
      error: error.message,
    });
  }
});
router.post("/student-assignments", async (req, res) => {
  try {
    const { semester, departmentId } = req.body;
    const assignment = await AssignmentModel.find({
      department: departmentId,
      semester: semester,
    })
      .populate("faculty", "name")
      .populate("course", "name");
    if (!assignment || !assignment.length === 0) {
      res.status(400).json({
        success: false,
        message: "No assignment found",
      });
    }
    assignment?.forEach((item) => {
      item.document = undefined;
      item.submissions = undefined;
    });
    res.status(200).json({
      success: true,
      message: "assignments fetched",
      assignments: assignment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching assignment",
    });
  }
});
router.get("/submitted-or-not/:assignmentId/:studentId", async (req, res) => {
  console.log(req.params);
  const { assignmentId, studentId } = req.params;
  try {
    const assignment = await AssignmentModel.findOne({ _id: assignmentId });
    if (!assignment) {
      return res.status(404).json({ success: false });
    }
    const exists = assignment.submissions?.findIndex(
      (item) => studentId === item.student.toString()
    );
    if (exists === -1) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true });
  } catch (error) {}
});

router.get("/get-submission-doc/:assignmentId/:studentId", async (req, res) => {
  try {
    const { assignmentId, studentId } = req.params;
    // Fetch the assignment from the database
    const assignment = await AssignmentModel.findById(assignmentId);
    if (!assignment || !assignment.document) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment or file not found" });
    }
    let submission = assignment?.submissions?.find(
      (item) => item?.student.toString() === studentId
    );
    // Set the file path
    const filePath = path.join(
      __dirname,
      "./uploads",
      submission?.doc?.filename
    ); // Adjust the uploads directory path
    console.log(filePath);
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ success: false, message: "File not found on the server" });
    }

    // Send the file using sendFile
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).json({
      success: false,
      message: "Error sending file",
      error: error.message,
    });
  }
});
module.exports = router;
