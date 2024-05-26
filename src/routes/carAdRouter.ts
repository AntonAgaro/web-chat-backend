import {Router} from "express";
import CarAdController from "../controllers/CarAdController";
const carAdRouter = Router()

carAdRouter.get('/all/:tableName', CarAdController.getAll)
carAdRouter.post('/create', CarAdController.create)
carAdRouter.post('/one', CarAdController.getAdByTitle)

export {carAdRouter}