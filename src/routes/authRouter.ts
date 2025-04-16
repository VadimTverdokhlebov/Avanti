import express, { RequestHandler } from 'express';
import AuthController from '../controllers/AuthController';
import validationUserMiddleware from '../middlewares/validationsUserMiddleware';

const authRouter = express.Router();

authRouter.post('/auth/registration', validationUserMiddleware as RequestHandler, AuthController.registration as RequestHandler);
authRouter.post('/auth/login', AuthController.login as RequestHandler);

export default authRouter;
