import { body, check, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req)

  const errorMessages = errors.array().map(({ msg }) => msg).join(", ")

  if (errors.isEmpty()) return next()
  else next(new ErrorHandler(errorMessages, 400))
}
const signUpValidator = () => [
  body("name", "Name is required").notEmpty().escape(),
  body("username", "Username is required").notEmpty().escape(),
  body("password", "Password is required").notEmpty().escape(),
  body("bio", "Bio is required").notEmpty().escape(),
  check("avatar", "Avatar is required").notEmpty(),
]

const loginValidator = () => [
  body("username", "Username is required").notEmpty().escape(),
  body("password", "Password is required").notEmpty().escape(),
]

const createNewGroupValidator = () => [
  body("name", "name is required").notEmpty().escape(),
  body("members").notEmpty().withMessage("members is required").escape().isArray({ min: 2, max: 100 }).withMessage("members must be between 2 and 100"),
]

const addGroupMembersValidator = () => [
  body("chatId", "Chat ID is required").notEmpty().escape(),
  body("members").notEmpty().withMessage("members is required").escape().isArray({ min: 1, max: 97 }).withMessage("members must be between 1 and 97"),
]
const removeGroupMemberValidator = () => [
  body("chatId", "Chat ID is required").notEmpty().escape(),
  body("userId", "User ID is required").notEmpty().escape(),
]
const sendAttachmentsValidator = () => [
  body("chatId", "Chat ID is required").notEmpty().escape(),
  check("files").notEmpty().withMessage("Avatar is required").isArray({ min: 1, max: 5 }).withMessage("Avatar must be between 1 and 5"),
]
const chatIdValidator = () => [
  param("id", "Chat ID is required").notEmpty().escape(),
]
const renameGroupValidator = () => [
  param("id", "Chat ID is required").notEmpty().escape(),
  body("name", "New Name is required").notEmpty().escape(),
]
const sendFriendRequestValidator = () => [
  body("userId", "UserId is required").notEmpty().escape(),
]
const acceptFriendRequestValidator = () => [
  body("requestId", "Request ID is required").notEmpty().escape(),
  body("accept").notEmpty().withMessage("Please Add Accept").escape().isBoolean().withMessage("Accept must be a boolean"),
]

export { signUpValidator, loginValidator, validateHandler, createNewGroupValidator, addGroupMembersValidator, removeGroupMemberValidator, sendAttachmentsValidator, chatIdValidator, renameGroupValidator, sendFriendRequestValidator, acceptFriendRequestValidator }