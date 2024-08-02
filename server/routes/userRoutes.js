import express from "express";
import { searchUser, sendFriendRequest, acceptFriendRequest, getNotifications, getMyFriends } from "../controllers/userControllers.js";
import { protectRoutes } from "../middlewares/protectroutes.js";
import { acceptFriendRequestValidator, sendFriendRequestValidator, validateHandler } from "../lib/validators.js";

const router = express.Router()

router.use(protectRoutes)
router.post("/search", searchUser);
router.put("/sendrequest", sendFriendRequestValidator(), validateHandler, sendFriendRequest);
router.put("/acceptequest", acceptFriendRequestValidator(), validateHandler, acceptFriendRequest);
router.get("/notifications", getNotifications);
router.get("/friends", getMyFriends)


export default router