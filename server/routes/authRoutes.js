import express from "express";
import { signupUser, loginUser, verifyEmail } from "../controllers/authController.js";
import { validateUser } from "../middleware/validateUser.js";
import { validateLogin } from "../middleware/validateLogin.js";

const router = express.Router();

router.post("/signup", validateUser, signupUser);
router.get("/verify/:token", verifyEmail);
router.post("/login", validateLogin, loginUser);

export default router;
