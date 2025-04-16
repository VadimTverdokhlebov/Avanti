import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import UserRepository from '../persistence/repositories/UserRepository';
import ApiError from '../exception/ApiError';
import { generateAccessToken } from '../helpers/jwt';
import { IUser } from '../persistence/models/userModel';
export default class AuthController {
  static async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { firstName, lastName, email, password } = req.body;
      const checkEmail = await UserRepository.getUser(email);

      if (checkEmail) {
        throw ApiError.badRequest('Email already exist!');
      }

      const hashedPassword = await bcrypt.hash(password, 3);
      const user: IUser = {
        email,
        hashedPassword,
        firstName,
        lastName,
      };

      const savedUser = await UserRepository.saveUser(user);
      const token = generateAccessToken(savedUser.id, savedUser.email);

      res.json({ message: 'registration successfully', savedUser, token });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.getUser(email);

      if (!user) {
        throw ApiError.badRequest('The user not found!');
      }

      const validPassword = await bcrypt.compare(password, user.hashedPassword);

      if (!validPassword) {
        throw ApiError.badRequest('Insert incorrect password');
      }

      const token = generateAccessToken(user.id, user.email);

      res.json({ message: 'login successfully', token });
    } catch (error) {
      next(error);
    }
  }
}
