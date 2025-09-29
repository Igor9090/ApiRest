"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async create(req, res) {
    try {
      const novoUser = await _User2.default.create(req.body);
      return res.json(novoUser);
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map(err => err.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ errors: ['Erro interno no servidor'] });
    }
  }

  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      if (!user) return res.status(404).json({ errors: ['Usuário não encontrado'] });

      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (error) {
      return res.status(500).json({ errors: ['Erro interno no servidor'] });
    }
  }

  async update(req, res) {
    try {
      const { id, nome, email, password } = req.body; 

      if (!id) {
        return res.status(400).json({ errors: ['ID não enviado'] });
      }

      const user = await _User2.default.findByPk(id);
      if (!user) {
        return res.status(400).json({ errors: ['Usuário não existe'] });
      }

      const novosDados = { nome, email };
      if (password) novosDados.password = password;

      const atualizado = await user.update(novosDados);

      return res.json({ id: atualizado.id, nome: atualizado.nome, email: atualizado.email });
    } catch (error) {
      console.error('Erro no update:', error);
      return res.status(500).json({ errors: ['Erro interno no servidor'] });
    }
  }

  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      if (!user) return res.status(400).json({ errors: ['Usuário não existe'] });

      await user.destroy();
      return res.json(null);
    } catch (error) {
      console.error('Erro no delete:', error);
      return res.status(500).json({ errors: ['Erro interno no servidor'] });
    }
  }
}

exports. default = new UserController();
