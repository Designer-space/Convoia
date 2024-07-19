import express from "express";
import { protectRoutes } from "../middlewares/protectroutes.js";
import { addGroupMembers, createNewGroup, getPersonalChats, getPersonalGroups } from "../controllers/chatControllers.js";

const router = express.Router()

router.use(protectRoutes)

router.get("/my", getPersonalChats);
router.get("/mygroups", getPersonalGroups);
router.put("/addmembers", addGroupMembers);
router.post("/new", createNewGroup);

export default router