import { Router } from "express";
import { getStudentStatus, registerStudent } from "../controllers/student.controller.js";

const router = Router();

router.route("/register").post(registerStudent);

router.route("/status/:student_id").get(getStudentStatus);


export default router;