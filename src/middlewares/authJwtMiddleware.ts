import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import ApiError from '../exception/ApiError';

export type UserPayload = { 
  userId: string,
  email: string
};

export interface ICustomRequest extends Request {
  user: UserPayload;
}

export default function authJwtMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw ApiError.unauthorization();
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw ApiError.unauthorization();
    }

    const decodetData = <UserPayload>jwt.verify(token, config.user.secretKey);
    (req as ICustomRequest).user = decodetData;
    return next();
  } catch (error) {
    return next(error);
  }
}
