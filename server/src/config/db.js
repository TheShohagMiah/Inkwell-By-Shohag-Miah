import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db_url = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("DB is connected successfully");
  } catch (error) {
    console.log("Db is not connected", error);
    process.exit(1);
  }
};

export default connectDB;
