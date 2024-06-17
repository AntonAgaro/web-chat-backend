import {Router} from "express";
import UsersController from "../controllers/UsersController";
const UsersRouter = Router()

UsersRouter.get('/all', UsersController.getAll)

export {UsersRouter}