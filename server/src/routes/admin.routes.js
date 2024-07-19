import { Router } from "express";
import { loginAdmin, registerAdmin } from "../controllers/admin.controller.js";
import {verifyJWT } from "../middleware/auth.js";

const router = Router();
router.route("/loginAdmin").post(loginAdmin);
router.route("/registerAdmin").post(registerAdmin);

//secured
router.route('/protected').get(verifyJWT, (req, res) => {
    // If the middleware allows the request to pass through,
    // it means the user is logged in. You can handle the request here.
    res.send('You are authorized to access this route.');
});

export default router;