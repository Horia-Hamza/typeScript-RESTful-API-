import { Request, Response, NextFunction } from 'express';

export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(err => {
      next(new Error(err )); 
    });
  };
}

export const globalError = (err: Error | { message: string, cause: number },
   req: Request,
   res: Response, next: NextFunction) => {
   if (typeof err === 'object' && 'cause' in err) {
     if (process.env.MOOD === 'DEV') {
       const errorWithStack = { ...err, stack: err instanceof Error ? err.stack : undefined };
       res.status(err.cause).json(errorWithStack);
     } if (process.env.MOOD === 'PROD') {
      res.status(err.cause).json({ message: err.message, status: err.cause });
     }
   }
 };
 
 