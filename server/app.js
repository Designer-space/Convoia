import express from "express";
import dotenv from "dotenv"

import connectMongoDB from "./utils/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config()

const PORT = process.env.PORT || 300;

export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "12af6271e5634aacf8683abf15aa3b5ea3bbf78ac91aa16ff4358f6a0ac3c2c3";

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())


// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/admin", adminRoutes)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectMongoDB();
})