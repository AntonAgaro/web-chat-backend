import {Router} from "express";
import UsersController from "../controllers/UsersController";
const UsersRouter = Router()

UsersRouter.get('/all', UsersController.getAll)
UsersRouter.post('/create', UsersController.create)
// carAdRouter.post('/one', CarAdController.getAdByTitle)

export {UsersRouter}