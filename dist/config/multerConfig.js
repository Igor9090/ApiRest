"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);

const rand = () => Math.floor(Math.random() * 10000 + 10000);

const uploadDir = _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images');

try {
  if (!_fs2.default.existsSync(uploadDir)) {
    _fs2.default.mkdirSync(uploadDir, { recursive: true });
    console.log('Pasta de uploads criada localmente:', uploadDir);
  }
} catch (err) {
  console.error('Erro ao criar pasta de uploads:', err);
}

exports. default = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {  // Adicionado PNG explicitamente
      return cb(new _multer2.default.MulterError('O Arquivo precisa ser do tipo PNG, JPG ou JPEG'));
    }
    return cb(null, true);
  },

  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) => {
      if (!_fs2.default.existsSync(uploadDir)) {
        return cb(new Error('Pasta de uploads não existe — verifique logs'));  // Erro mais claro
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${rand()}${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
