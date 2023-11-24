import { sequelize } from "./dbconfig.js";
import User from "../models/userModel.js";
import Department from "../models/departmentModel.js";
import Admin from "../models/adminModel.js";
import { Faculty } from "../models/facultyModels.js";
import {
  Courses,
  Student,
  StudentAttendance,
  StudentCourses,
} from "../models/studentModel.js";

const syncDB = async () => {
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.".bold.bgGreen);
  } catch (error) {
    console.log("error in synchronizing all models - ", error);
  }
};

export default syncDB;
