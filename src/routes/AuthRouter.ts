import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const AuthRouter = Router();

AuthRouter.post('/signin', AuthController.signin);
AuthRouter.post('/signup', AuthController.signup);

export { AuthRouter };
