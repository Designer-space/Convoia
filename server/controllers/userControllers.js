import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { User } from "../models/user.js";
import { emitEvent } from "../utils/emitter.js";
import { ErrorHandler } from "../utils/utility.js";
import { getOtherMember } from "../lib/helper.js";

export const searchUser = TryCatch(
  async (req, res) => {

    const { name } = req.query;

    // find all my chats
    const myChat = await Chat.find({
      groupChat: false,
      members: req.user._id
    })

    // extraction all users from my chat or people i have chated with
    const allUsersFromMyChat = myChat.flatMap(({ members }) => members)

    // find all users except me and match with name
    const allUserExceptMe = await User.find({
      _id: { $nin: allUsersFromMyChat },
      name: { $regex: name, $options: "i" }
    })

    // return only name and avatar
    const users = allUserExceptMe.map(({ _id, name, avatar }) => ({ _id, name, avatar: avatar.url }))

    return res.status(200).json({ message: users })

  }
)

export const sendFriendRequest = TryCatch(
  async (req, res, next) => {
    const { userId } = req.body;

    const request = await Request.findOne({
      $or: [
        {
          sender: req.user._id,
          receiver: userId
        },
        {
          sender: userId,
          receiver: req.user._id
        }
      ]
    })

    if (request) return next(new ErrorHandler("Request already sent", 400))

    await Request.create({
      sender: req.user._id,
      receiver: userId
    })

    emitEvent(req, NEW_REQUEST, [userId])

    return res.status(200).json({ message: "Friend Request sent successfully" })
  }
)

export const acceptFriendRequest = TryCatch(
  async (req, res, next) => {
    const { requestId, accept } = req.body

    const request = await Request.findById(requestId).populate("sender", "name").populate("receiver", "name")

    if (!request) return next(new ErrorHandler("Request not found", 404))

    if (request.receiver._id.toString() !== req.user._id.toString()) return next(new ErrorHandler("Unauthorized", 401))

    if (!accept) {
      await request.deleteOne();
      return res.status(200).json({ message: "Friend Request rejected" })
    }

    const members = [request.sender._id, request.receiver._id]

    await Promise.all([Chat.create({ members, name: `${request.sender.name} - ${request.receiver.name}` }), request.deleteOne()])

    emitEvent(req, REFETCH_CHATS, members)

    return res.status(200).json({ message: "Friend Request accepted", senderId: request.sender._id })
  }
)

export const getNotifications = TryCatch(
  async (req, res, next) => {
    const request = await Request.find({
      receiver: req.user._id
    }).populate("sender", "name avatar")

    const allRequests = request.map(({ sender, _id }) => ({
      _id,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url
      }
    }))

    return res.status(200).json({ message: allRequests })
  }
)

export const getMyFriends = TryCatch(
  async (req, res, next) => {
    const chatId = req.query.chatId;

    const chats = await Chat.find({ members: req.user._id, groupChat: false }).populate("members", "name avatar")

    const friends = chats.map(({ members }) => {
      const otherMember = getOtherMember(members, req.user._id);

      return {
        _id: otherMember._id,
        name: otherMember.name,
        avatar: otherMember.avatar.url
      }
    })

    if (chatId) {

      const chat = await Chat.findById(chatId)

      const availableFriends = friends.filter(({ _id }) => !chat.members.includes(_id))

      return res.status(200).json({ friends: availableFriends })

    } else {
      return res.status(200).json({ message: friends })
    }
  }
)