import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import userModel from "../../../../DB/models/user";
import { asyncHandler } from "../../../services/errorHandling";
import {CreateUser} from "../../../../DB/interfaces/user.interface"
export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
         const error = new Error("Email already exists");
         (error as any).cause = 200; 
      next(error);
    } else {
      const hash = await bcrypt.hash(
        password,
        parseInt(process.env.saltRound as string)
      );
      const user:CreateUser = {
        userName:req.body.userName,
        email:req.body.email,
        password:hash,
        role:req.body.role
      }
      const newUser = new userModel(user);
      const savedUser = await newUser.save();
      res.status(201).json({ message: "Done", id: savedUser });
    }
  }
)

export const signin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({email});
  if (!user) {
    const error = new Error("email does not exist");
    (error as any).cause = 404; 
 next(error);
  } else {
        const compare = bcrypt.compareSync(password,user.password);
        if (!compare) {
          const error = new Error("wrong password");
          (error as any).cause = 404; 
       next(error);
        } else {
          const tokenSignature = process.env.tokenSignature  || 'defaultSecret';
          const token = jwt.sign(
            { id: user._id, isLoggedIn: true },
            tokenSignature,
            { expiresIn: 60 * 60 * 24 }
          );
          res.status(200).json({ message: "Done", token });
        }
      }
    }
);


