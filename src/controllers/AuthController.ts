import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import UserRepository from '../persistence/repositories/UserRepository';
import UserService, { IUserData } from '../domain/services/UserService';
import ApiError from '../exception/ApiError';
import { generateAccessToken } from '../helpers/jwt';

export default class AuthController {
    static async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, email, password } = req.body;
            const checkEmail = await UserRepository.getUser(email);

            if (checkEmail) {
                throw ApiError.badRequest('Email already exist!');
            }

            const hashedPassword = await bcrypt.hash(password, 3);
            const user: IUserData = {
                email,
                hashedPassword,
                firstName,
                lastName
            };

            const savedUser = await UserRepository.saveUser(user);
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

            const validPassword = await bcrypt.compare(password, user.hashedPassword);

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
