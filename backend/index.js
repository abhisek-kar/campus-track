const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./configs/db");
const cookieParser = require("cookie-parser");
const { sendMail } = require("./controllers/mailController");
const multer = require("multer");
const path = require("path");

//dot en configuration
dotenv.config();

//DB connection
connectDb();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// multer config
// Define storage configuration for Multer

//routes
// URL => http://localhost:8080
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/attendance", require("./routes/attendanceRoutes"));
app.use("/api/v1/course", require("./routes/coursesRoutes"));
app.use("/api/v1/student", require("./routes/studentRoutes"));
app.use("/api/v1/faculty", require("./routes/facultyRoutes"));
app.use("/api/v1/department", require("./routes/departmentRoutes"));
app.use("/api/v1/assignment", require("./routes/assignmentRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.post("/api/v1/mail/send-mail", sendMail);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome to Food Server APP API BASE PROJECT </h1>");
});

//PORT
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
