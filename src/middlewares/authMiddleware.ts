// import jwt from 'jsonwebtoken';
// import config from '../config/auth.config'
// import {Request, Response, NextFunction} from "express";
// import ApiError from "../utils/error";
//
// export function verifyToken(req: Request, res: Response, next: NextFunction) {
//     const token = req.headers['x-access-token'];
//
//     if (!token) {
//         throw new ApiError(403, 'No token provided!');
//     }
//
//     jwt.verify(token as string, config.secret, (err, decoded) => {
//         if (err) {
//             throw new ApiError(401, 'Unauthorized!')
//         }
//         req.userId = decoded.id
//     })
// }
//
// export function isAdmin(req: Request, res: Response, next: NextFunction) {}
//
// export function isModerator(req: Request, res: Response, next: NextFunction) {}
//
// export function isModeratorOrAdmin(req: Request, res: Response, next: NextFunction) {}