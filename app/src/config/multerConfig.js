import multer from "multer";
import { extname, join } from 'path';
import fs from 'fs';

const rand = () => Math.floor(Math.random() * 10000 + 10000);

const uploadDir = join(process.cwd(), 'app', 'uploads', 'images');

try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Pasta de uploads criada em:', uploadDir);
  }
} catch (err) {
  console.error('Erro ao criar pasta de uploads:', err);
}

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {  
      return cb(new multer.MulterError('O Arquivo precisa ser do tipo PNG, JPG ou JPEG'));
    }
    return cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(uploadDir)) {
        return cb(new Error('Pasta de uploads não existe — verifique logs'));
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${rand()}${extname(file.originalname)}`);
    },
  }),
};
