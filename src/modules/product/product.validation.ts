import joi from "joi";
export const createProduct ={
   body:joi.object().required().keys({
    name: joi.string().required(),
    description: joi.string(),
    price: joi.number().required(),
   }),
}

