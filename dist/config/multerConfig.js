"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');  // Mudado para join (mais seguro que resolve)
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);  // Built-in para criar pasta dinamicamente

const rand = () => Math.floor(Math.random() * 10000 + 10000);

// Diretório de destino: process.cwd() é a raiz, + /app/uploads/images
const uploadDir = _path.join.call(void 0, process.cwd(), 'app', 'uploads', 'images');

// Cria a pasta se não existir (com try-catch para debug)
try {
  if (!_fs2.default.existsSync(uploadDir)) {
    _fs2.default.mkdirSync(uploadDir, { recursive: true });  // recursive: cria pastas aninhadas
    console.log('Pasta de uploads criada em:', uploadDir);  // Log para confirmar no terminal
  }
} catch (err) {
  console.error('Erro ao criar pasta de uploads:', err);  // Mostra se der pau
}

exports. default = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {  // Adicionado PNG
      return cb(new _multer2.default.MulterError('O Arquivo precisa ser do tipo PNG, JPG ou JPEG'));
    }
    return cb(null, true);
  },

  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) => {
      if (!_fs2.default.existsSync(uploadDir)) {
        return cb(new Error('Pasta de uploads não existe — verifique logs'));
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${rand()}${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
