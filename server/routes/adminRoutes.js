import express from "express"
import { adminLogin, adminLogout, getAdminData, getAllChats, getAllMessages, getAllUsers, getDashboardStats } from "../controllers/adminController.js"
import { adminLoginValidator, validateHandler } from "../lib/validators.js"
import { protectAdminRoutes } from "../middlewares/protectroutes.js"

const router = express.Router()

router.post("/verify", adminLoginValidator(), validateHandler, adminLogin)
router.get("/logout", adminLogout)

router.use(protectAdminRoutes)

router.get("/", getAdminData)

router.get("/users", getAllUsers)
router.get("/chats", getAllChats)
router.get("/messages", getAllMessages)

router.get("/stats", getDashboardStats)

export default router