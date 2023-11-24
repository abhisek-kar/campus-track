import { sequelize } from "../configs/dbconfig.js";
import { DataTypes } from "sequelize";
import Department from "./departmentModel.js";
import User from "./userModel.js";

export const Courses = sequelize.define(
  "Courses",
  {
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    course_code: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    course_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "Courses",
    timestamps: false,
  }
);

export const Student = sequelize.define(
  "Student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    student_mail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    student_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    student_mobile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    student_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    student_enroll_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Department,
        key: "department_id",
      },
    },
  },
  {
    tableName: "Student",
    timestamps: false,
  }
);
// foreign key relationships
// Student.belongsTo(sequelize.models.User, {
//   foreignKey: User.user_id,
// });
// Student.belongsTo(sequelize.models.Department, {
//   foreignKey: Department.department_id,
// });

export const StudentAttendance = sequelize.define(
  "StudentAttendance",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Student,
        key: "student_id",
      },
    },
    total_present: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_absent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_classes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_seek_leaves: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "StudentAttendance",
    timestamps: false,
  }
);

// foreign keys
// StudentAttendance.belongsTo(sequelize.models.Student, {
//   foreignKey: Student.student_id,
// });

export const StudentCourses = sequelize.define(
  "StudentCourses",
  {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "student_id",
      },
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Courses,
        key: "course_id",
      },
    },
  },
  {
    tableName: "StudentCourses",
    timestamps: false,
  }
);

// foreign keys
// StudentCourses.belongsTo(sequelize.models.Courses, {
//   foreignKey: Courses.course_id,
// });
// StudentCourses.belongsTo(sequelize.models.Student, {
//   foreignKey: Student.student_id,
// });

// //  many-to-many relationship through the array of course IDs
// Student.belongsToMany(Courses, {
//   through: "StudentCourses", // This is a virtual table name
//   foreignKey: "student_id",
// });
// Courses.belongsToMany(Student, {
//   through: "StudentCourses", // This is a virtual table name
//   foreignKey: "course_id",
// });
