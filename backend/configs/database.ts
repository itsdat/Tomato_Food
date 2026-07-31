import mongoose from "mongoose";
import 'dotenv/config';
import createInitAdmin from "../databases/initConfig.database.js";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI as string).then(() => {
        createInitAdmin();
        console.log("Database Connected");
    })
}