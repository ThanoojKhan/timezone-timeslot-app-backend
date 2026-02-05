import mongoose from "mongoose";
import ENV from "./env";
import AppError from "../utils/appError";
import { log } from "console";

const MONGODB_URI = ENV.MONGODB_URI;

export async function connectMongoDB(): Promise<void> {
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
            autoIndex: false
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
        throw new AppError({ statusCode: 500, message: "MongoDB connection failed", error: err });
    }
}

export async function disconnectMongoDB(): Promise<void> {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (err) {
        throw new AppError({ statusCode: 500, message: "MongoDB disconnect failed", error: err });
    }
}