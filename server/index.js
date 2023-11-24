import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import extraRoutes from "./routes/extraRoutes.js";
import connectDB, { sequelize } from "./configs/dbconfig.js";
import syncDB from "./configs/syncDB.js";
import adminRoutes from "./routes/adminRoutes.js";

//dotenv config
dotenv.config();

// rest object
const app = express();

// port
let port = process.env.PORT || 8080;

//database connection
connectDB();

// synhronising models
syncDB();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/extra", extraRoutes);
app.use("/api/v1/admin", adminRoutes);

//listen
app.listen(port, () => {
  console.log(`server started on port ${port}`.bgGreen.bold);
});
