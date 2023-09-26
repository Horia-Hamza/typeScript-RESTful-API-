import mongoose from 'mongoose';
import {config} from "../config"
export const connectDB = async () => {
  try {
const dbURI = config.dbUri
    // Connect to the MongoDB database
    await mongoose.connect(dbURI as string);
    console.log(`Connected successfully to MongoDB at ${dbURI}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
  
};


