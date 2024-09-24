import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler, uploadFilsToCloudinary } from "../utils/utility.js";

export const signup = TryCatch(
  async (req, res, next) => {

    const { name, username, password, bio } = req.body;

    const file = req.file;

    if (!file) return next(new ErrorHandler("Please Upload Profile Picture", 400));

    const result = await uploadFilsToCloudinary([file]);

    const avatar = {
      public_id: result[0].public_id,
      url: result[0].url
    };

    const user = await User.create({
      name, username, password, bio, avatar
    });

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      message: "User Created Successfully"
    });

  }
);
export const login = TryCatch(
  async (req, res, next) => {

    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Username or password", 404));

    const isMatch = await compare(password, user.password);

    if (!isMatch) return next(new ErrorHandler("Invalid Username or password", 404));

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      message: "Login Successfully"
    });

  }
);

export const logout = (req, res) => {
  res.cookie("convoia-token", "", {
    maxAge: 0
  });
  return res.status(200).json({ message: "Logout Succesfully" });
};

export const getme = (req, res) => {

  const user = req.user;

  return res.status(200).json(user);
};