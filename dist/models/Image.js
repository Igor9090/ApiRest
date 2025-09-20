"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig); // Corrija o caminho

 class Image extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: "O Campo não pode estar vazio"
          }
        }
      },
      filename: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: "O Campo não pode estar vazio"
          }
        }
      },
      url: {
        type: _sequelize.Sequelize.VIRTUAL,
        get() {
          return `${_appConfig2.default.url}/images/${this.getDataValue('filename')}`
        }
      }
    }, {
      sequelize,
      tableName: 'images', // Adicione
      underscored: true,   // Adicione
    });
    // REMOVA: return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: "aluno_id" }); // Corrigido: models.Aluno
  }
} exports.default = Image;
