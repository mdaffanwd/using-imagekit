import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
    throw new Error("Please define mongo_uri in env variables")
}

let cached = global.mongoose
if (!cached) {
    global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        // mongoose.connect(MONGODB_URI)
        //     .then(() => mongoose.connection)
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: true,
            maxPoolSize: 10
        })
            .then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        console.error("MongoDB connection error:", error);
        cached.promise = null;
        throw error;
    }
    return cached.conn
}
