import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()
const mongoDB_URI=process.env.mongoDB_URI

export const connectDB=async () => {
    try {
        await mongoose.connect(mongoDB_URI)
        console.log("mongodb connected succesfully");
    } catch (error) {
        console.log("error connecting mongodb",error);
    }
}