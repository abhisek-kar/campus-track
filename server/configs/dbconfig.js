import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "campustrackdb",
  logging: true,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully.".italic
        .bold.bgWhite
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectDB;
