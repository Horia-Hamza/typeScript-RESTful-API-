import * as productController from './controller/product'
import {validation} from "../../middleWare/validation"
import {createProduct} from "./product.validation"
import {auth} from "../../middleWare/authentication"
import {endPoint} from "./product.endPoint"
import { Router } from "express";
export const productRouter = Router()
productRouter.post('/',validation(createProduct),auth(endPoint.create),productController.createProduct)
productRouter.put('/:id',auth(endPoint.update),productController.updateProduct)
productRouter.get('/',productController.products)
productRouter.get('/:id',productController.product)
productRouter.delete('/:id',productController.deleteProduct)



