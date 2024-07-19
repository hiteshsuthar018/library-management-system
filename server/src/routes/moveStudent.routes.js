import { Router } from "express";
import { verifyJWT } from "../middleware/auth.js";
import { issueBook } from "../controllers/moveStudent.controller.js";


const router = Router();
router.use(verifyJWT);

router.route("/:student_id").post(issueBook);


export default router;