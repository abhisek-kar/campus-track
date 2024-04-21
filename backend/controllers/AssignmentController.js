const multer = require("multer");
const AssignmentModel = require("../models/AssignmentModel");

// Multer storage configuration
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage });

// POST route for creating an assignment with file upload
(exports.createAssignment = upload.single("file")),
  async (req, res) => {
    try {
      const { department, semester, course, task, submitBy } = req.body;

      // Check if a file was uploaded
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }

      // Create a new assignment object
      const newAssignment = new AssignmentModel({
        department,
        semester,
        course,
        task,
        document: {
          data: req.file.buffer, // Buffer of file data
          contentType: req.file.mimetype, // MIME type of the file
        },
        submitBy,
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
  };
