import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import cors from "cors";

import connectMongoDB from "./utils/connectMongoDB.js";
import { errorMiddleware, TryCatch } from "./middlewares/error.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

dotenv.config();

const PORT = process.env.PORT || 300;

export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "12af6271e5634aacf8683abf15aa3b5ea3bbf78ac91aa16ff4358f6a0ac3c2c3";
export const userSocketIDs = new Map();

connectMongoDB();

const app = express();

const server = createServer(app);

const io = new Server(server, {});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173", process.env.CLIENT_URL],
  credentials: true
}));


// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use(errorMiddleware);

io.use(() => { });

io.on("connection", (socket) => {

  const tempUser = {
    _id: uuid(),
    name: "Guest",
  };

  userSocketIDs.set(tempUser._id.toString(), socket.id);

  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {

    const messageForRealtime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: tempUser._id,
        name: tempUser.name
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: tempUser._id,
      chat: chatId,
    };

    const usersSocket = getSockets(members);

    io.to(usersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealtime
    });

    io.to(usersSocket).emit(NEW_MESSAGE_ALERT, {
      chatId
    });

    TryCatch(async () => {
      await Message.create(messageForDB);
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
    userSocketIDs.delete(tempUser._id.toString());
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});