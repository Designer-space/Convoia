import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";

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

