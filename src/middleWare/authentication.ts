import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken"; // Import TokenExpiredError for handling token expiration
import UserModel from "../../DB/models/user";
import { asyncHandler } from "../services/errorHandling.js";

export const roles = {
  Admin: "Admin",
  User: "User",
  Vendor: "Vendor",
};

export const auth = (accessRoles: string[] = [roles.User]) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    
    try {
      if (!authorization?.startsWith(process.env.bearerKey as string)) {
        throw new Error("Invalid token or bearer key");
      } else {
        const token = authorization.split(process.env.bearerKey as string)[1];
        const decoded: any = jwt.verify(
          token,
          process.env.tokenSignature as string
        );
        if (!decoded?.id || !decoded?.isLoggedIn) {
          throw new Error("Invalid token payload");
        } else {
          const user = await UserModel.findById(decoded.id);
          
          if (!user) {
            throw new Error("Not registered user");
          } else {
            if (!accessRoles.includes(user.role)) {
              throw new Error("Unauthorized user");
            } else {
              (req as any).user = user;
              return next();
            }
          }
        }
      }
    } catch (error) {
      // Handle JWT-related errors here
      if (error instanceof TokenExpiredError) {
        // Handle token expiration error
        console.log("Token has expired");
        return res.status(401).json({ message: "Token has expired" });
      } else {
        (error as any).cause = 403;
        return next(error);
      }
    }
  });
};
