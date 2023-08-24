import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import UserRepository from '../../persistence/repositories/UserRepository';
import UserService from '../../domain/services/UserService';
import ApiError from '../../exception/ApiError';
import { generateAccessToken } from '../../helpers/jwt';

export default class AuthController {
  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      
      const { firstName, lastName, email, password } = req.body;
      const checkEmail = await UserRepository.checkEmailUser(email);
      
      if (checkEmail) {
        throw ApiError.badRequest('Email already exist!');
      }
      
      const hashPassword = await bcrypt.hash(password, 3);
      const user = UserService.createUser(firstName, lastName, email, hashPassword);

      const savedUser = await UserRepository.createUser(user);
      const token = generateAccessToken(savedUser.id, savedUser.email);

      return res.json({ status: 'registration ok', savedUser, token });
    } catch (error) {
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await UserRepository.getUser(email);

      if (!user) {
        throw ApiError.badRequest('The user not found!');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw ApiError.badRequest('Insert incorrect password');
      }

      const token = generateAccessToken(user.id, user.email);

      return res.json({ status: 'login ok', token });
    } catch (error) {
      return next(error);
    }
  }
}
