const DepartmentModel = require("../models/DepartmentModel");

// create department
exports.createDepartmentController = async (req, res) => {
  try {
    const { name, code } = req.body;

    // Check if the department name is unique
    const existingDepartment = await DepartmentModel.findOne({
      $or: [{ code }, { name }],
    });
    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: "Department already exists",
      });
    }

    const newDepartment = new DepartmentModel(req.body);
    await newDepartment.save();

    return res.status(201).json({
      success: true,
      message: "Department created successfully",
      department: newDepartment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in department API",
    });
  }
};

// delete department
exports.deleteDepartmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDepartment = await DepartmentModel.findOneAndDelete({
      _id: id,
    });

    if (!deletedDepartment) {
      return res.status(404).json({
        success: false,
        message: `Department  not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Department deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in department api",
    });
  }
};

// update department
exports.updateDepartmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDepartment = await DepartmentModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true } // Return the modified document
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        success: false,
        message: `Department  not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Department  updated successfully`,
      department: updatedDepartment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in department api",
    });
  }
};

// get department by id
exports.getDepartmentByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await DepartmentModel.findOne({ _id: id });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: `Department  not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Department  retrieved successfully`,
      department: department,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in department api",
    });
  }
};

// get all department
exports.getAllDepartmentsController = async (req, res) => {
  try {
    const allDepartments = await DepartmentModel.find()
      .populate("admin")
      .populate("faculties");

    if (!allDepartments || allDepartments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No departments found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Departments retrieved successfully",
      departments: allDepartments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in getAllDepartmentsController",
    });
  }
};
