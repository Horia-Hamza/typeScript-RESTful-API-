import * as userController from './controller/registration'
import {validation} from "../../middleWare/validation"
import * as validators from "./auth.validation"
import { Router } from "express";
export const authRouter = Router()
authRouter.post('/signup',validation(validators.signup),userController.signup)
authRouter.post('/signin',validation(validators.signin),userController.signin)
