import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d"
  })

  res.cookie("convoia-token", token, {
    maxAge: 15 * 24 * 60 * 60 * 100,
    httpOnly: true, // Prevent XSS attack cross-site scripting sttacks
    sameSite: "strict", //CSRF attack cross-site request forgery sttacks
    secure: process.env.NODE_ENV !== "development"
  })
}