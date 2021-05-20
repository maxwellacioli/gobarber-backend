import multer from 'multer';
import { randomBytes } from 'crypto';
import { resolve } from 'path';

const tempDirectory = resolve(__dirname, '..', '..', 'temp')

export default {
  directory: tempDirectory,
  storage: multer.diskStorage({
    destination: tempDirectory,
    filename: (req, file, callback) => {
      const fileHash = randomBytes(10).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    }
  })
}