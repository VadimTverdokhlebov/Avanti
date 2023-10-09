import express from 'express';
import AuthController from '../controllers/AuthController';
import validationUserMiddleware from '../middlewares/validationsUserMiddleware';

const authRouter = express.Router();

authRouter.post('/auth/registration', validationUserMiddleware, AuthController.registration);
authRouter.post('/auth/login', AuthController.login);

export default authRouter;
