import multer from "multer";
import { extname, join } from 'path';  // Mudado para join (mais seguro que resolve)
import fs from 'fs';  // Built-in para criar pasta dinamicamente

const rand = () => Math.floor(Math.random() * 10000 + 10000);

// Diretório de destino: process.cwd() é a raiz, + /app/uploads/images
const uploadDir = join(process.cwd(), 'app', 'uploads', 'images');

// Cria a pasta se não existir (com try-catch para debug)
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });  // recursive: cria pastas aninhadas
    console.log('Pasta de uploads criada em:', uploadDir);  // Log para confirmar no terminal
  }
} catch (err) {
  console.error('Erro ao criar pasta de uploads:', err);  // Mostra se der pau
}

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {  // Adicionado PNG
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
