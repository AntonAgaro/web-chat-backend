import {NextFunction, Request, Response} from "express";
import UsersService from "../services/UsersService";

class UsersController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const {user} = request.body

            if (!user) {
                return response.status(400).json({message: "User not found!"})
            }
            const isUserExist = await UsersService.checkUserAlreadyExist(user)
            if (isUserExist) {
                return response.status(200).json({message: `User with username ${user.username} already exist!`})
            }
            const res = await UsersService.createUser(user)
            return response.status(200).json(res)
        } catch (e) {
            next(e)
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const res = await UsersService.getAll()
            return response.status(200).json(res)
        } catch(e)  {
            next(e)
        }
    }
}

export default new UsersController()