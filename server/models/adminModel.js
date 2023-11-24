import { sequelize } from "../configs/dbconfig.js";
import { DataTypes } from "sequelize";
import Department from "./departmentModel.js";
import User from "./userModel.js";

const Admin = sequelize.define("Admin", {
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: User.user_id,
    },
  },
  admin_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  admin_mobile: {
    type: DataTypes.STRING(20),
  },
  admin_email: {
    type: DataTypes.STRING(50),
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Department,
      key: Department.department_id,
    },
  },
});

// foreign key relationships
Admin.belongsTo(sequelize.models.User, { foreignKey: "user_id" });
Admin.belongsTo(sequelize.models.Department, { foreignKey: "department_id" });

export default Admin;
