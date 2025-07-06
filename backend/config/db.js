import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoDBURL)
        console.log("DB connected")
    } 
    catch (err) {
        console.error("db error", err)
        process.exit(1)
    }
}