import { Router } from "express";
import { borrowedList, getAllStudents, overDueStudentList } from "../controllers/list.controller.js";
import { verifyJWT } from "../middleware/auth.js";


const router = Router();
router.use(verifyJWT);

router.route("/").get(getAllStudents);
router.route("/borrowedList").get(borrowedList);
router.route("/dueList").get(overDueStudentList);



export default router;