"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfigjs = require('../config/multerConfig.js'); var _multerConfigjs2 = _interopRequireDefault(_multerConfigjs);
var _Imagejs = require('../models/Image.js'); var _Imagejs2 = _interopRequireDefault(_Imagejs);

const upload = _multer2.default.call(void 0, _multerConfigjs2.default).single('archive');

class ImageController {
  create(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        console.error('Erro no Multer (detalhes):', error);
        return res.status(400).json({ errors: [error.code || error.message] });
      }

      if (!req.file) {
        return res.status(400).json({ errors: ['Arquivo não enviado'] });
      }

      const { originalname, filename } = req.file;
      const { aluno_id } = req.body;

      if(!aluno_id) {
        return res.status(400).json({ errors: ['Id Inválido'] });
      }
      try {

        const image = await _Imagejs2.default.create({originalname, filename, aluno_id});
        return res.json(image);
      } catch (err) {
        console.error('Erro ao salvar no BD:', err);
        return res.status(500).json({ errors: ['Erro ao salvar imagem no banco'] });
      }
    });
  }
}

exports. default = new ImageController();
