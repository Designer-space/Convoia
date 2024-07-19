import jwt from "jsonwebtoken"
import { TryCatch } from "./error.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";

const protectRoutes = TryCatch(
  async (req, res, next) => {

    const token = req.cookies["convoia-token"]

    if (!token) return next(new ErrorHandler("Unauthorized: No Token Provided", 401))

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return next(new ErrorHandler("Unauthorized: Invalid Token", 401))

    const user = await User.findById(decoded._id).select("-password");

    if (!user) return next(new ErrorHandler("User Not Found", 404))

    req.user = user

    next();
  }
)

export { protectRoutes }