import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://thabochambule1:5pMldKexTOvUqMO2@cluster0.qjlen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Global variable to cache the database connection
let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  // If we have a connection already, return it
  if (cachedConnection) {
    return cachedConnection;
  }

  // If no connection exists, create a new one
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
}
