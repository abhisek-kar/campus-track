import Department from "../../models/departmentModel.js";

const departmentController = async (req, res) => {
  const { department } = req.body;
  try {
    // check if department exists
    const existingDepartment = await Department.findOne({
      where: { department_name: department },
    });
    if (existingDepartment) {
      return res
        .status(404)
        .json({ message: "Department Already Exists", success: false });
    }
    await Department.create({
      department_name: department,
    });
    return res.status(201).json({
      message: "Department created successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
export default departmentController;
