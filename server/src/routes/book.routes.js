import { Router } from "express";
import { verifyJWT } from "../middleware/auth.js";
import { newBookCreation } from "../controllers/book.controller.js";


const router = Router();
router.use(verifyJWT);

router.route("/").post(newBookCreation);




export default router;