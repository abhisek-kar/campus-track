import { sequelize } from "../configs/dbconfig.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_mail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    user_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_role: {
      type: DataTypes.ENUM("student", "faculty", "admin"),
      allowNull: false,
    },
  },
  {
    tableName: "User",
    timestamps: false,
  }
);
export default User;
