import multer from 'multer';
import multerConfig from '../config/multerConfig.js';
import Image from "../models/Image.js";

const upload = multer(multerConfig).single('archive');

class ImageController {
  create(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({ errors: [error.code] });
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
        const image = await Image.create({originalname, filename, aluno_id});
        return res.json(image);
      } catch (err) {

        return res.status(500).json({ errors: ['Erro ao salvar imagem no banco'] });
      }
    });
  }
}

export default new ImageController();
