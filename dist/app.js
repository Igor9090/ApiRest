"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');
_dotenv2.default.config();

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _expressdelay = require('express-delay'); var _expressdelay2 = _interopRequireDefault(_expressdelay);

var _homeRoutesjs = require('./routes/homeRoutes.js'); var _homeRoutesjs2 = _interopRequireDefault(_homeRoutesjs);
var _userRoutesjs = require('./routes/userRoutes.js'); var _userRoutesjs2 = _interopRequireDefault(_userRoutesjs);
var _tokenRoutesjs = require('./routes/tokenRoutes.js'); var _tokenRoutesjs2 = _interopRequireDefault(_tokenRoutesjs);
var _alunoRoutesjs = require('./routes/alunoRoutes.js'); var _alunoRoutesjs2 = _interopRequireDefault(_alunoRoutesjs);
var _imageRoutesjs = require('./routes/imageRoutes.js'); var _imageRoutesjs2 = _interopRequireDefault(_imageRoutesjs);
var _indexjs = require('./database/index.js'); var _indexjs2 = _interopRequireDefault(_indexjs); 


_indexjs2.default.connection.authenticate()
  .then(() => console.log('✅ Conexão com PostgreSQL estabelecida com sucesso!'))
  .catch(error => console.error('❌ Erro ao conectar com PostgreSQL:', error));

const whiteList = [
  'https://apirest-qiek.onrender.com',
  'http://localhost:3000',
  undefined,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by Cors'));
    }
  },
};

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlaware();
    this.routes();
  }

  middlaware() {
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_expressdelay2.default.call(void 0, 1500))
    const staticPath = _path.join.call(void 0, process.cwd(), 'app', 'uploads', 'images');
    this.app.use('/images', _express2.default.static(staticPath));
  }

  routes() {
    this.app.use("/", _homeRoutesjs2.default);
    this.app.use("/users/", _userRoutesjs2.default);
    this.app.use("/tokens/", _tokenRoutesjs2.default);
    this.app.use("/alunos/", _alunoRoutesjs2.default);
    this.app.use("/images/", _imageRoutesjs2.default);
  }
}

exports. default = new App().app;
