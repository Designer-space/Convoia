import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${connect.connection.host}`);

  } catch (error) {
    console.log(`Error Connecting to DB: ${error.message}`);
    process.exit(1)
  }
}

export default connectMongoDB;