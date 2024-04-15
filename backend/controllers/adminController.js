const AdminModel = require("../models/AdminModel");
const DepartmentModel = require("../models/DepartmentModel");

exports.createAdminController = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is unique
    const existingAdmin = await AdminModel.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with the provided email already exists",
      });
    }

    // Check if the department already has an admin
    // const existingDepartment = await DepartmentModel.findOne({ name });
    // if (existingDepartment && existingDepartment.admin) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Department already has an admin",
    //   });
    // }

    const newAdmin = new AdminModel(req.body);
    await newAdmin.save();

    // // Update the department's admin field
    // if (existingDepartment) {
    //   existingDepartment.admin = newAdmin._id;
    //   await existingDepartment.save();
    // }

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in admin API",
    });
  }
};

exports.deleteAdminController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await AdminModel.findOneAndDelete({ _id: id });

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in admin api",
    });
  }
};

exports.updateAdminController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await AdminModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true } // Return the modified document
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      admin: updatedAdmin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in admin api",
    });
  }
};

exports.getAllAdminsController = async (req, res) => {
  try {
    const allAdmins = await AdminModel.find();

    if (!allAdmins || allAdmins.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No admins found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admins retrieved successfully",
      admins: allAdmins,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in admin API",
    });
  }
};

exports.getAdminByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await AdminModel.findOne({ _id: id });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin retrieved successfully",
      admin: admin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in admin api",
    });
  }
};
