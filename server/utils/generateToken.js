import jwt from "jsonwebtoken"
import { cookieOptions } from "./utility.js"

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15d"
  })

  res.cookie("convoia-token", token, cookieOptions)
}