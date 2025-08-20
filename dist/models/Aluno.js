"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _Image = require('./Image'); var _Image2 = _interopRequireDefault(_Image);

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 125],
            msg: 'O nome precisa conter entre 3 e 125 caracteres'
          }
        }
      },

      sobrenome: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 125],
            msg: 'O sobrenome precisa conter entre 3 e 125 caracteres'
          }
        }
      },

      email: {
        type: _sequelize.Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: "Email já existe"
        },
        validate: {
          isEmail: {
            msg: 'Email Inválido!'
          }
        }
      },

      idade: {
        type: _sequelize.Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'O campo Idade precisa conter um número inteiro'
          }
        }
      },

      peso: {
        type: _sequelize.Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'O campo Peso precisa conter um número inteiro ou ponto flutuante'
          }
        }
      },

      altura: {
        type: _sequelize.Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'O campo Idade precisa conter um número inteiro ou ponto flutuante'
          }
        }
      },
    }, {
      sequelize
    });
    return this;
  }

  static associate(models){
    this.hasMany(models.Image, {foreignKey: "aluno_id"})
  }
} exports.default = Aluno;
