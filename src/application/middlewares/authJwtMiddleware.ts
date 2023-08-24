import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../exception/ApiError';

export interface ICustomRequest extends Request {
  user: string | JwtPayload;
}

export default function authJwtMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const { authorization } = req.headers;

    if (authorization === undefined) {
      throw ApiError.unauthorization();
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw ApiError.unauthorization();
    }

    const decodetData = jwt.verify(token, config.user.secretKey);
    (req as ICustomRequest).user = decodetData;
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
}
