import express, { Router, Request, Response } from "express";
import { authRouter } from "./modules/auth/auth.router";
import { productRouter } from "./modules/product/product.router";
import dotenv from "dotenv";
import { config } from "../config";
import { globalError } from "./services/errorHandling";
import { connectDB } from "../DB/connection";
dotenv.config();
if (config.nodeEnv === "DEV") {
  console.log("Running in development mode");
}

const app = express();
const port = process.env.PORT;

// Convert Buffer Data
app.use(express.json());

// Base URL
const baseUrl = process.env.BASEURL;

// Set up API routing
app.use(`${baseUrl}/auth`, authRouter as Router);
app.use(`${baseUrl}/product`, productRouter as Router);

// In-valid Routing
app.use("*", (req: Request, res: Response) => {
  res.status(404).send("page not found");
});

// Global Handling Error
app.use(globalError);

// Connection DB
connectDB();
app.listen(port, () => {
  console.log(`Server is running on port.....${port}`);
});
