import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import ApiError from '../exception/ApiError';
import ApiValidationError from '../exception/ApiValidationError';
import logger from '../helpers/logger';

export default async function errorsMiddleware(
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (error instanceof ApiError) {
    logger.error({ message: error.message, errors: error.errors });
    return res.status(error.status).json({ message: error.message, errors: error.errors });
  }

  if (error instanceof ApiValidationError) {
    logger.error({ message: error.message, errors: error.errors });
    return res.status(400).json({ message: error.message, errors: error.errors });
  }

  logger.error(error);
  return res.status(500).json({ message: 'Unexpected error' });
}
