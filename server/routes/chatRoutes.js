import express from "express";
import { protectRoutes } from "../middlewares/protectroutes.js";
import { addGroupMembers, createNewGroup, deleteChat, getChatDetails, getMessages, getPersonalChats, getPersonalGroups, leaveGroup, removeGroupMember, renameGroup, sendAttachments } from "../controllers/chatControllers.js";
import { attachmentMulter } from "../middlewares/multer.js";
import { addGroupMembersValidator, chatIdValidator, createNewGroupValidator, removeGroupMemberValidator, renameGroupValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";

const router = express.Router()

router.use(protectRoutes)

router.get("/my", getPersonalChats);
router.post("/new", createNewGroupValidator(), validateHandler, createNewGroup);
router.put("/addmembers", addGroupMembersValidator(), validateHandler, addGroupMembers);
router.put("/removemember", removeGroupMemberValidator(), validateHandler, removeGroupMember);
router.get("/mygroups", getPersonalGroups);
router.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

router.post("/message", attachmentMulter, sendAttachmentsValidator(), validateHandler, sendAttachments)
router.get("/message/:id", chatIdValidator(), validateHandler, getMessages)
router.route("/:id").get(chatIdValidator(), validateHandler, getChatDetails).put(renameGroupValidator(), validateHandler, renameGroup).delete(chatIdValidator(), validateHandler, deleteChat)
export default router