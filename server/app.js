import express from "express";
import dotenv from "dotenv"

import connectMongoDB from "./utils/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import { createUser } from "./seeders/chatSeeders.js";

dotenv.config()

const PORT = process.env.PORT;

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())


// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectMongoDB();
})