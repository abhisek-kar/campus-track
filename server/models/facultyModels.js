import { sequelize } from "../configs/dbconfig.js";
import { DataTypes } from "sequelize";
import User from "./userModel.js";

export const Faculty = sequelize.define(
  "Faculty",
  {
    faculty_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: User.user_id,
      },
    },
    faculty_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    faculty_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    faculty_mobile: {
      type: DataTypes.STRING(20),
    },
    faculty_address: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: "Faculty",
    timestamps: false,
  }
);
Faculty.belongsTo(sequelize.models.User, { foreignKey: "user_id" });
