import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
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
      creator: req.user,
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

    const chat = await Chat.findById(chatId)

    if (!chat) return next(new ErrorHandler("Member not found", 404));
    if (!chat.groupChat) return next(new ErrorHandler("This is not group chat", 400));
    if (!chat.creator.toString() !== req.user._id.toString()) return next(new ErrorHandler("You are not allowed to add members", 403));

    const allNewMemberPromise = members.map((memberId) => User.findById(memberId, "name"))

    const allNewMember = Promise.all(allNewMemberPromise)

    chat.members.push(...allNewMember.map((i) => i._id))

    if (chat.members.length > 100) {
      return next(new ErrorHandler("Group members limit reachrd", 400));
    }

    await chat.save()

    const allUserName = allNewMember.map((member) => member.name).join(",")

    emitEvent(req, ALERT, chat.members, `${allUserName} has been added in the group`)
    emitEvent(req, REFETCH_CHATS, chat.members)

    return res.status(200).json({ message: "Members Added successfully" })
  }
)