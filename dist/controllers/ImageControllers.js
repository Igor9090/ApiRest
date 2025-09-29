"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfigjs = require('../config/multerConfig.js'); var _multerConfigjs2 = _interopRequireDefault(_multerConfigjs);
var _Imagejs = require('../models/Image.js'); var _Imagejs2 = _interopRequireDefault(_Imagejs);
var _Alunojs = require('../models/Aluno.js'); var _Alunojs2 = _interopRequireDefault(_Alunojs);

const upload = _multer2.default.call(void 0, _multerConfigjs2.default).single('archive');

class ImageController {
  async create(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'Nenhum arquivo enviado'
        });
      }

      const { originalname, filename } = req.file;
      const { aluno_id } = req.body;

      try {
        const alunoExists = await _Alunojs2.default.findByPk(aluno_id);
        if (!alunoExists) {
          return res.status(400).json({
            success: false,
            error: `Aluno com ID ${aluno_id} não existe`
          });
        }

        const image = await _Imagejs2.default.create({ originalname, filename, aluno_id });

        return res.json({
          success: true,
          data: {
            id: image.id,
            filename: image.filename,
            url: `/images/${image.filename}`, 
            aluno_id: image.aluno_id
          }
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: 'Erro ao salvar imagem'
        });
      }
    });
  }

  async index(req, res) {
    try {
      const images = await _Imagejs2.default.findAll();
      return res.json({
        success: true,
        data: images
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Erro ao buscar imagens'
      });
    }
  }

  async show(req, res) {
    try {
      const image = await _Imagejs2.default.findByPk(req.params.id);
      if (!image) {
        return res.status(404).json({
          success: false,
          error: 'Imagem não encontrada'
        });
      }
      return res.json({
        success: true,
        data: image
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Erro ao buscar imagem'
      });
    }
  }
}

exports. default = new ImageController();
