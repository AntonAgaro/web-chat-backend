import ApiError from "utils/error"
import {NextFunction, Request, Response} from "express";

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непредвиденная ошибка"})
}