import express from "express";
import { protectRoutes } from "../middlewares/protectroutes.js";
import { addGroupMembers, createNewGroup, getPersonalChats, getPersonalGroups, leaveGroup, removeGroupMember } from "../controllers/chatControllers.js";

const router = express.Router()

router.use(protectRoutes)

router.get("/my", getPersonalChats);
router.post("/new", createNewGroup);
router.put("/addmembers", addGroupMembers);
router.put("/removemember", removeGroupMember);
router.get("/mygroups", getPersonalGroups);
router.delete("/leave/:id", leaveGroup);

export default router