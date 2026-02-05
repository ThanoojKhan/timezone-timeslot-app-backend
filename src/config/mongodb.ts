import mongoose from "mongoose";
import ENV from "./env";

const MONGODB_URI = ENV.MONGODB_URI;

export async function connectMongoDB(): Promise<void> {
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
            autoIndex: false
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed");
        throw error;
    }
}

export async function disconnectMongoDB(): Promise<void> {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
}