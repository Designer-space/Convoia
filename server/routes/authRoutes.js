import express from "express";
import { getme, login, logout, signup } from "../controllers/authControllers.js";
import { singleAvatar } from "../middlewares/multer.js";
import { protectRoutes } from "../middlewares/protectroutes.js";

const router = express.Router()

router.post("/signup", singleAvatar, signup)
router.post("/login", login)
router.get("/logout", logout)
router.get("/me", protectRoutes, getme)

export default router