import {Router} from "express";
import {carAdRouter} from "./carAdRouter";
import {UsersRouter} from "./UsersRouter";

const router = Router()
router.use('/car-ad', carAdRouter)
router.use('/users', UsersRouter)

export {router}