import {Request,Response,NextFunction} from "express"
import jwt from 'jsonwebtoken'
import UserModel  from '../../DB/models/user'
import { asyncHandler } from '../services/errorHandling.js'

export const roles =  {
    Admin:"Admin",
    User:"User",
    Vendor:"Vendor"
}
export const auth = (accessRoles: string[] = [roles.User]) => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers;
      if (!authorization?.startsWith(process.env.bearerKey as string)) {
        const error = new Error("in-valid token or bearer key");
        (error as any).cause = 200; 
     next(error);
      } else {
        const token = authorization.split(process.env.bearerKey as string)[1];
        const decoded: any = jwt.verify(token, process.env.tokenSignature as string);
        if (!decoded?.id || !decoded?.isLoggedIn) {
          const error = new Error("in-valid token payload");
          (error as any).cause = 200; 
       next(error);
        } else {
          const user = await UserModel.findById(decoded.id);
          if (!user) {
            const error = new Error("Not register user");
            (error as any).cause = 401; 
         next(error);
          } else {
            if (!accessRoles.includes(user.role)) {
              const error = new Error("Un-authorized user");
              (error as any).cause = 403; 
           next(error);
            } else {
                (req as any).user = user;
              next();
            }
          }
        }
      }
    });
  };

