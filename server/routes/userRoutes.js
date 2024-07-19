import express from "express";
import { searchUser } from "../controllers/userControllers.js";
import { protectRoutes } from "../middlewares/protectroutes.js";

const router = express.Router()

router.use(protectRoutes)
router.post("/search", searchUser);

export default router