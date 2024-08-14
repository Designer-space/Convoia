import jwt from "jsonwebtoken"
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { cookieOptions, ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";

export const adminLogin = TryCatch(
  async (req, res, next) => {

    const { secretKey } = req.body;


    const isMatch = secretKey === adminSecretKey;

    if (!isMatch) return next(new ErrorHandler("Invalid Admin Credentials", 401))

    const token = jwt.sign(secretKey, process.env.JWT_SECRET)

    return res.status(200).cookie("convoia-admin-token", token, { ...cookieOptions, maxAge: 1000 * 60 * 15 }).json({ message: "Authenticated Successfully" })
  }
)

export const adminLogout = TryCatch(
  async (req, res, next) => {
    return res.status(200).cookie("convoia-admin-token", "", { ...cookieOptions, maxAge: 0 }).json({ message: "Logged Out Successfully" })
  }
)

export const getAdminData = TryCatch(
  async (req, res, next) => {
    return res.status(200).json({ admin: true })
  }
)

export const getAllUsers = TryCatch(
  async (req, res, next) => {
    const users = await User.find({})

    const transformedUsers = await Promise.all(
      users.map(async (user) => {

        const [groups, friends] = await Promise.all([Chat.countDocuments({ groupChat: true, members: user._id }), Chat.countDocuments({ groupChat: false, members: user._id })])

        return {
          _id: user._id,
          avatar: user.avatar.url,
          name: user.name,
          groups,
          friends
        }
      })
    )

    return res.status(200).json({ transformedUsers })
  }
)

export const getAllChats = TryCatch(
  async (req, res, next) => {
    const chats = await Chat.find({}).populate("members", "name avatar").populate("creator", "name avatar")

    const transformedChats = await Promise.all(
      chats.map(async ({ members, _id, name, creator, groupChat }) => {

        const totalMessages = await Message.countDocuments({ chat: _id })

        return {
          _id,
          groupChat,
          name,
          avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
          members: members.map(({ _id, name, avatar }) => ({ _id, name, avatar: avatar.url })),
          creator: { name: creator?.name || "none", avatar: creator?.avatar.url || "" },
          totalMembers: members.length,
          totalMessages
        }
      })
    )

    return res.status(200).json({ transformedChats })
  }
)

export const getAllMessages = TryCatch(
  async (req, res, next) => {
    const messages = await Message.find({}).populate("sender", "name avatar").populate("chat", "groupChat")

    const transformedMessages =
      messages.map(async ({ _id, attachments, content, sender, chat, createdAt }) => {
        return {
          _id,
          attachments: attachments,
          content,
          sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url
          },
          chat: chat._id,
          groupChat: chat.groupChat,
          createdAt
        }
      })

    return res.status(200).json({ transformedMessages })
  }
)

export const getDashboardStats = TryCatch(
  async (req, res, next) => {
    const [groupsCount, usersCount, messagesCount, totalChatsCount] = await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments({}),
      Message.countDocuments({}),
      Chat.countDocuments({})
    ])

    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 7);

    const last7DaysMessagesCount = await Message.find({ createdAt: { $gte: last7Days, $lte: today } }).select("createdAt")

    const messages = new Array(7).fill(0)

    last7DaysMessagesCount.forEach(message => {
      const index = Math.floor((today.getTime() - message.createdAt.getTime()) / (1000 * 60 * 60 * 24))
      messages[6 - index]++
    })

    const stats = {
      groupsCount, usersCount, messagesCount, totalChatsCount, messagesChart: messages
    }

    return res.status(200).json({ stats })
  }
)