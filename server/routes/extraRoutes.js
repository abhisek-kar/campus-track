import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import departmentController from "../controllers/extra/departmentController.js";

const router = Router();

router.post("/add-department", departmentController);
router.post("/add-admin", departmentController);

export default router;
