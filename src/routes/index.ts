import {Router} from "express";
import {UsersRouter} from "./UsersRouter";
import {AuthRouter} from "./AuthRouter";

const router = Router()
router.use('/users', UsersRouter)
router.use('/auth', AuthRouter)

export {router}