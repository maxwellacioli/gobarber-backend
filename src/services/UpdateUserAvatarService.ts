import { getRepository } from 'typeorm';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {

  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new AppError(`User not authenticated`, 401);
    }

    if (user.avatar) {
      const filePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(filePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(filePath);
        // fs.unlink(filePath, (err) => {
        //   if (err) {
        //     throw Error(`Error on delete file!`);
        //   }
        // });
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatarService;