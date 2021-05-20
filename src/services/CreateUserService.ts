import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {

  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const emailAlreadyExists =
      await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new AppError(`Already exists an user with email ${email}`);
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;