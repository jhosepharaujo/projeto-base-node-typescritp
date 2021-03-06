import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.');
        }

        const token = sign({}, '24897652fbdca778449959e3ce63f364', {
            subject: user.id,
            expiresIn: '1d',
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
