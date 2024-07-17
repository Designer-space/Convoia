import { compare } from "bcrypt"
import { User } from "../models/user.js"
import { generateTokenAndSetCookie } from "../utils/generateToken.js"
import { TryCatch } from "../middlewares/error.js"
import { ErrorHandler } from "../utils/utility.js"

export const signup = async (req, res) => {

  const { name, username, password, bio } = req.body

  const avatar = {
    public_id: "asdfgh",
    url: "http://helloworld.com"
  }

  const user = await User.create({
    name, username, password, bio, avatar
  })

  generateTokenAndSetCookie(user._id, res)

  res.status(201).json({
    message: "User Created Successfully"
  })

}
export const login = TryCatch(
  async (req, res, next) => {

    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password")
    const isMatch = await compare(password, user.password)

    if (!user || !isMatch) return next(new ErrorHandler("Invalid Credentials", 404))

    generateTokenAndSetCookie(user._id, res)

    res.status(201).json({
      message: "Login Successfully"
    })

  }
)

export const logout = (req, res) => {
  res.json({ data: "You hit the login EndPoint" })
}

export const getme = (req, res) => {
  res.json({ data: "You hit the GetMe EndPoint" })
}