import multer from 'multer';
import multerConfig from '../config/multerConfig.js';
import Image from "../models/Image.js";
import Aluno from "../models/Aluno.js";

const upload = multer(multerConfig).single('archive');

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
        const alunoExists = await Aluno.findByPk(aluno_id);
        if (!alunoExists) {
          return res.status(400).json({
            success: false,
            error: `Aluno com ID ${aluno_id} não existe`
          });
        }

        const image = await Image.create({ originalname, filename, aluno_id });

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
      const images = await Image.findAll();
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
      const image = await Image.findByPk(req.params.id);
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

export default new ImageController();
