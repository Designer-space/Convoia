import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import connectMongoDB from "./utils/connectMongoDB.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config()

const PORT = process.env.PORT;

const app = express()

// Middleware
app.use(express.json())


// API Routes
app.use("/api/auth", authRoutes)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectMongoDB()
})