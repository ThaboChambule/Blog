import mongoose from "mongoose";

// Use environment variable or fallback to local MongoDB if the Atlas connection fails
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

  // MongoDB connection options
  const options = {
    // These options help with connection stability
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  // If no connection exists, create a new one
  try {
    // First try connecting to MongoDB Atlas
    let connection: typeof mongoose;
    try {
      console.log("Attempting to connect to MongoDB Atlas...");
      connection = await mongoose.connect(MONGODB_URI, options);
      console.log("Successfully connected to MongoDB Atlas");
    } catch (atlasErr) {
      console.error("MongoDB Atlas connection error:", atlasErr);
      // Try connecting to local MongoDB as fallback
      console.log("Attempting to connect to local MongoDB...");
      connection = await mongoose.connect("mongodb://localhost:27017/blog", options);
      console.log("Successfully connected to local MongoDB");
    }
    
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error("All MongoDB connection attempts failed:", error);
    throw new Error(`Failed to connect to any database: ${error instanceof Error ? error.message : String(error)}`);
  }
}
