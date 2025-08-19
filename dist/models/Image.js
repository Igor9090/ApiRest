"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);


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
        get(){
          return `${_appConfig2.default.url}/images/${this.getDataValue('filename')}`
        }
      }
    }, {
      sequelize
    });
    return this;
  }

  static associate(models){
    this.belongsTo(models.Image , {foreignKey: "aluno_id"})
  }
} exports.default = Image;
