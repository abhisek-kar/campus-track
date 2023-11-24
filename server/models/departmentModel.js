import { sequelize } from "../configs/dbconfig.js";
import { DataTypes } from "sequelize";

const Department = sequelize.define(
  "Department",
  {
    department_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    department_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // admin_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: "Admin",
    //     key: "admin_id",
    //   },
    // },
  },
  {
    tableName: "Department",
    timestamps: false,
  }
);

// foreign key relationships
// Department.belongsTo(sequelize.models.Admin, { foreignKey: "admin_id" });

export default Department;
