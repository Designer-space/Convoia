import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { Message } from "../models/message.js";
import { emitEvent } from "../utils/emitter.js";
import { ErrorHandler } from "../utils/utility.js";

export const createNewGroup = TryCatch(
  async (req, res, next) => {

    const { name, members } = req.body;

    if (members.length < 2) return next(new ErrorHandler("Groups must have at least 2 members", 400))

    const allmembers = [...members, req.user._id]

    await Chat.create({
      name,
      groupChat: true,
      creator: req.user._id,
      members: allmembers,
    });

    emitEvent(req, ALERT, allmembers, `Welcome to ${name} group`)
    emitEvent(req, REFETCH_CHATS, members)

    return res.status(200).json({ message: "Group Created" })

  }
)

export const getPersonalChats = TryCatch(
  async (req, res, next) => {

    const chats = await Chat.find({ members: req.user._id }).populate("members", "name avatar")

    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {

      const otherMember = getOtherMember(members, req.user._id);

      return {
        _id,
        groupChat,
        avatar: groupChat ? members.slice(0, 3).map(({ avatar }) => avatar.url) : [otherMember.avatar.url],
        name: groupChat ? name : otherMember.name,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user._id.toString()) {
            prev.push(curr._id)
          }
          return prev
        }, [])
      }
    })

    return res.status(200).json({ transformedChats })
  }
)

export const getPersonalGroups = TryCatch(
  async (req, res, next) => {

    const chats = await Chat.find({
      members: req.user._id,
      groupChat: true,
      creator: req.user._id
    }).populate("members", "name, avatar")

    const groups = chats.map(({ members, _id, groupChat, name }) => ({
      _id,
      groupChat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url)
    }));


    return res.status(200).json({ groups })
  }
)

export const addGroupMembers = TryCatch(
  async (req, res, next) => {

    const { chatId, members } = req.body;

    if (!members || members.length < 1) {
      return next(new ErrorHandler("Please provide members", 400));
    }

    const chat = await Chat.findById(chatId)

    if (!chat) return next(new ErrorHandler("Member not found", 404));
    if (!chat.groupChat) return next(new ErrorHandler("This is not group chat", 400));
    if (chat.creator.toString() !== req.user._id.toString()) return next(new ErrorHandler("You are not allowed to add members", 403));

    const allNewMembersPromise = members.map((memberId) => User.findById(memberId, "name"))

    const allNewMembers = await Promise.all(allNewMembersPromise)

    const filterdNewMembers = allNewMembers.filter((member) => !chat.members.includes(member._id.toString())).map(i => i._id)

    chat.members.push(...filterdNewMembers.map((i) => i._id))

    if (chat.members.length > 100) {
      return next(new ErrorHandler("Group members limit reachrd", 400));
    }

    await chat.save()

    const allUserName = allNewMembers.map((member) => member.name).join(",")

    emitEvent(req, ALERT, chat.members, `${allUserName} has been added in the group`)
    emitEvent(req, REFETCH_CHATS, chat.members)

    return res.status(200).json({ message: "Members Added successfully" })
  }
)

export const removeGroupMember = TryCatch(
  async (req, res, next) => {

    const { userId, chatId } = req.body;

    const [chat, userToRemove] = await Promise.all([
      Chat.findById(chatId),
      User.findById(userId, "name"),
    ]);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));
    if (!chat.groupChat) return next(new ErrorHandler("This is not group chat", 400));
    if (chat.creator.toString() !== req.user._id.toString()) return next(new ErrorHandler("You are not allowed to remove members", 403));

    if (chat.members.length <= 3) {
      return next(new ErrorHandler("Group must have atleast 3 members", 400));
    }

    chat.members = chat.members.filter((member) => member.toString() !== userId.toString());

    await chat.save()

    emitEvent(req, ALERT, chat.members, `${userToRemove.name} has been removed form the group`);
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({ message: "Member removed successfully" })
  }
)

export const leaveGroup = TryCatch(
  async (req, res, next) => {

    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));
    if (!chat.groupChat) return next(new ErrorHandler("This is not group chat", 400));

    const remainingMembers = chat.members.filter(
      (memeber) => memeber.toString() !== req.user._id.toString()
    )

    if (remainingMembers.length < 3) {
      return next(new ErrorHandler("Group must have atleast 3 members", 400));
    }

    if (chat.creator.toString() === req.user._id.toString()) {
      chat.creator = remainingMembers[0]
    }

    chat.members = remainingMembers

    await chat.save()

    emitEvent(req, ALERT, chat.members, `User ${req.user.name} has left the group`);

    return res.status(200).json({ message: `${req.user.name} has left the group successfully` })
  }
)

export const sendAttachments = TryCatch(
  async (req, res, next) => {

    const { chatId } = req.body;

    const [chat, user] = await Promise.all([
      Chat.findById(chatId),
      User.findById(req.user._id, "name"),
    ]);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    const files = req.files || [];

    if (files.length < 1) return next(new ErrorHandler("Please provide attachments", 400));

    // upload attachments

    const attachments = []

    const messageForDatabase = {
      content: "",
      attachments,
      sender: user._id,
      chat: chatId
    }

    const messageForRealTime = {
      ...messageForDatabase,
      sender: {
        _id: user._id,
        name: user.name
      }
    }

    const message = await Message.create(messageForDatabase);

    emitEvent(req, NEW_ATTACHMENT, chat.members, {
      message: messageForRealTime,
      chatId
    });

    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
      chatId
    })

    return res.status(200).json({ message: message })
  }
)