import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class CreateSessionService {

  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const user =
      await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError(`Incorrect email/password`);
    }

    const passwordHashed = user.password != null ? user.password : '';

    const validPassword = await compare(password, passwordHashed);

    const { secret, expiresIn } = authConfig.jwt;

    if (validPassword) {
      const token = sign({
        data: {}
      }, secret, {
        subject: user.id,
        expiresIn
      });

      delete user.password;

      return { user, token };
    }
    else {
      throw new AppError(`Incorrect email/password`, 401);
    }
  }
}

export default CreateSessionService;