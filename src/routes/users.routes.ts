import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUserService =
    new CreateUserService();

  const user =
    await createUserService.execute({ name, email, password });

  delete user.password;

  return res.json(user);
});

//redundant declare this middleware here
usersRouter.patch('/avatar', AuthMiddleware, upload.single('avatar'), async (req, res) => {
  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({ user_id: req.user.id, avatarFileName: req.file.filename });

  return res.json(user);
});

export default usersRouter;