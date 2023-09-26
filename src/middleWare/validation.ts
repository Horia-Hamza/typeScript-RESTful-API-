import { Request, Response, NextFunction, request } from 'express'; // Assuming you're using Express and need these types
import Joi, { ValidationResult } from 'joi'; // Import Joi and ValidationResult types

const dataMethod = ['body', 'params', 'query', 'headers']
interface Schema {
    [key: string]: Joi.Schema; // Define the structure of your Schema object
  }
export const validation = (Schema:Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validationArr:any[]  = []
            dataMethod.forEach(key => {
                if (Schema[key]) {
                    const validationResult = Schema[key].validate(req[key as keyof typeof req]  , { abortEarly: false })
                    if (validationResult?.error) {
                        validationArr.push(validationResult.error.details)
                    }
                }
            })
            if (validationArr.length) {
                res.status(400).json({ message: "Validation error", validationArr })
            } else {
                next()
            }
        } catch (error) {
            res.status(500).json({ message: "Catch error", error })

        }
    }
}
