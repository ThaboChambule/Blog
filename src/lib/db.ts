// Mock database connection module
import mongoose from 'mongoose';

// Global variable to cache the fake database connection
let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  // For development with mock data, we'll just return a fake connection
  console.log('Using mock database connection for development');
  
  // Return the mongoose instance without actually connecting to a database
  if (!cachedConnection) {
    cachedConnection = mongoose;
  }
  
  return cachedConnection;
}
