import express from "express";
import { getme, login, logout, signup } from "../controllers/authControllers.js";
import { singleAvatar } from "../middlewares/multer.js";

const router = express.Router()

router.post("/signup", singleAvatar, signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/me", getme)

export default router