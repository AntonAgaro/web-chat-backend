import { NextFunction, Request, Response } from "express";
import UsersService from "../services/UsersService";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import authConfig from "../config/auth.config";

class AuthController {
    async signin(request: Request, response: Response, next: NextFunction) {
        //TODO если несколько раз логинишься, jwt каждый раз перегенериться!!!???
        try {
            const {user} = request.body

            if (!user) {
                return response.status(400).json({message: "User data not found!"})
            }

            const existingUser = await UsersService.getUserByName(user)

            if (!existingUser) {
                return response.status(404).json({message: `User with username ${user.username} not found!`})
            }

            const passwordIsValid = bcrypt.compareSync(
                    user.password,
                     existingUser.password
                );

            if (!passwordIsValid) {
                return response.status(401).json({message: `Password for user ${user.username} is incorrect!`})
            }
            //TODO добавить роли пользователя в токен
            const token = jwt.sign({username: existingUser.username}, authConfig.secret, {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400
            })

            //TODO найти и добавить в ответ роли пользователя

            return response.status(200).json({
                id: existingUser.id,
                username: existingUser.username,
                accessToken: token
            })

        } catch(e) {
            next(e)
        }
    }

    async signup(request: Request, response: Response, next: NextFunction) {
        try {
            const {user} = request.body

            if (!user) {
                return response.status(400).json({message: "User not found!"})
            }
            const existingUser = await UsersService.getUserByName(user)
            if (existingUser) {
                return response.status(200).json({message: `User with username ${user.username} already exist!`})
            }
            const res = await UsersService.createUser(user)
            return response.status(200).json({message: 'User was successfully created!', user: res})
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()