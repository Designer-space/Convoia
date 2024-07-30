import express from "express";
import { protectRoutes } from "../middlewares/protectroutes.js";
import { addGroupMembers, createNewGroup, deleteChat, getChatDetails, getMessages, getPersonalChats, getPersonalGroups, leaveGroup, removeGroupMember, renameGroup, sendAttachments } from "../controllers/chatControllers.js";
import { attachmentMulter } from "../middlewares/multer.js";

const router = express.Router()

router.use(protectRoutes)

router.get("/my", getPersonalChats);
router.post("/new", createNewGroup);
router.put("/addmembers", addGroupMembers);
router.put("/removemember", removeGroupMember);
router.get("/mygroups", getPersonalGroups);
router.delete("/leave/:id", leaveGroup);

router.post("/message", attachmentMulter, sendAttachments)
router.get("/message/:id", getMessages)
router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat)
export default router