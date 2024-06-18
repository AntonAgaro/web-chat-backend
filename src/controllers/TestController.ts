import type {NextFunction, Request, Response} from "express";
import ApiError from "../utils/error";

class TestController {
    publicAccess(req: Request, res: Response) {
        res.status(200).json({message: 'it is public page!'})
    }

    privateAccess(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({message: 'Unauthorized!'})
            }
            console.log(req.user)
            res.status(200).json({message: 'it is private page!'})
        } catch(e) {
            next(e)
        }
    }
}

export default new TestController()