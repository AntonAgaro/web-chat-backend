import {Request, Response, NextFunction} from "express";
import CarAdService from "../services/CarAdService";

class CarAdController {
    async create(request: Request, response: Response, next: NextFunction) {
       try {
           const {carAd, tableName} = request.body
           if (!carAd || !tableName) {
               return response.status(400).json({message: "Invalid request"})
           }
           const res = await CarAdService.createAd(carAd, tableName)
           return response.status(200).json(res)
       } catch (e) {
           next(e)
       }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            console.log(request.params.tableName)
            const tableName = request.params.tableName

            if (!tableName) {
                return response.status(400).json({message: "Invalid request"})
            }

            const res = await CarAdService.getAll(tableName)
            return response.status(200).json(res)
        } catch(e)  {
            next(e)
        }
    }

    async getAdByTitle(request: Request, response: Response, next: NextFunction) {
        try {
            const {title, tableName} = request.body
            if (!title || !tableName) {
                return response.status(400).json({message: "Invalid request"})
            }
            const res = await CarAdService.getAdByTitle(tableName, title)
            return response.status(200).json(res)
        } catch (e) {
            next(e)
        }
    }
}

export default new CarAdController()