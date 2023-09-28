import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const dataMethod = ["body", "params", "query", "headers"];
interface Schema {
  [key: string]: Joi.Schema;
}
export const validation = (Schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationArr: any[] = [];
      dataMethod.forEach((key) => {
        if (Schema[key]) {
          const validationResult = Schema[key].validate(
            req[key as keyof typeof req],
            { abortEarly: false }
          );
          if (validationResult?.error) {
            validationArr.push(validationResult.error.details);
          }
        }
      });
      if (validationArr.length) {
        res.status(400).json({ message: "Validation error", validationArr });
      } else {
        return next();
      }
    } catch (error) {
      return res.status(500).json({ message: "Catch error", error });
    }
  };
};
