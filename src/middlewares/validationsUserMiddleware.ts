import { Request, Response, NextFunction } from 'express';
import ApiValidationError from '../exception/ApiValidationError';

export default async function valaditionsMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const errors: string[] = [];

    const validationSchema = [
      {
        regex: /^[A-Za-z0-9!#*&$]+$/,
        rules: 'Only English letters, numbers and symbols !, #, *, &, $ are allowed',
        field: 'password'
      },
      {
        regex: /\d/,
        rules: 'Must be one digit',
        field: 'password'
      },
      {
        regex: /[A-Z]/,
        rules: 'Must be one capital letter',
        field: 'password'
      },
      {
        regex: /[!#*&$]/,
        rules: 'There must be one special character: !, #, *, &, $',
        field: 'password'
      },
      {
        regex: /^.{8,}$/,
        rules: 'Password must be at least 8 characters',
        field: 'password'
      },
      {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        rules: 'Email is not valid',
        field: 'email'
      }
    ];

    if (!req.body) {
      errors.push('Missing data field');
    }

    const { email, password } = req.body;

    for (const validator of validationSchema) {
      switch (validator.field) {
        case 'password':
          if (!validator.regex.test(password)) {
            errors.push(validator.rules);
          }
          break;
        case 'email':
          if (!validator.regex.test(email)) {
            errors.push(validator.rules);
          }
          break;
        default:
          break;
      }
    }

    if (errors.length) {
      throw ApiValidationError.badValidation('Validation error', errors);
    }

    next();
  } catch (error) {
    return next(error);
  }
}
