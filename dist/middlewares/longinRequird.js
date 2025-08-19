"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: 'Login required'
    });
  }


  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      errors: 'Token mal formatado'
    });
  }

  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await _User2.default.findOne({
      where: {
        id,
        email
      }
    });

    if (!user) {
      return res.status(404).json({
        errors: 'Usuário não encontrado'
      });
    }

    req.usersId = id;
    req.usersEmail = email;
    return next();
  } catch (error) {
    return res.status(401).json({
      errors: 'Token Inválido ou Expirado'
    });
  }
}
