import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import addStudent from "../controllers/admin/addStudent.js";
import addCourse from "../controllers/admin/addCourse.js";

const router = Router();

// add student details || POST
router.post("/add-student", verifyToken, addStudent);

// add course details || POST
router.post("/add-course", verifyToken, addCourse);

export default router;
