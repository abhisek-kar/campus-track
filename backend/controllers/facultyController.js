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
    const allFaculty = await FacultyModel.find();

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
