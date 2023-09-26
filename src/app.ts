import express, { Request, Response, Router } from 'express';
import dotenv from "dotenv";
import { connectDB } from "../DB/connection";
import {authRouter} from './modules/auth/auth.router'
import {productRouter} from './modules/product/product.router'
import { globalError } from "./services/errorHandling";
import { config } from "../config";
dotenv.config();
if (config.nodeEnv === 'DEV') {
  console.log('Running in development mode');
}
const app =express()
app.use(express.json());
const port = process.env.PORT || 5000 ;
const baseUrl = process.env.BASEURL
app.use(`${baseUrl}/auth`, authRouter as Router);
app.use(`${baseUrl}/product`, productRouter as Router);
app.use("*", (req:Request, res:Response) => {
  res.status(200).send("page not found");
});
app.listen(port, () => {
  console.log(`Server is running on port.....${port}`);
});
//global handling Error
app.use(globalError);
connectDB()