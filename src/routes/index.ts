import {Router} from "express";
import {UsersRouter} from "./UsersRouter";
import {AuthRouter} from "./AuthRouter";
import {testRouter} from "./TestRouter";

const router = Router()
router.use('/users', UsersRouter)
router.use('/auth', AuthRouter)
router.use('/test', testRouter)

export {router}