import { Router } from 'express';
import TestController from '../controllers/TestController';
const testRouter = Router();

testRouter.get('/public', TestController.publicAccess);
testRouter.get('/private', TestController.privateAccess);

export { testRouter };
