import dotenv from "dotenv";
dotenv.config();
export const config = {
   nodeEnv: process.env.MOOD,
   dbUri: process.env.MOOD === 'PROD' ? process.env.DB_URI_PROD : process.env.DB_URI_DEV,
   apiKey: process.env.API_KEY,
 };