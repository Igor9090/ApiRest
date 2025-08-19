import { Sequelize, Model } from 'sequelize';
import Image from './Image';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 125],
            msg: 'O nome precisa conter entre 3 e 125 caracteres'
          }
        }
      },

      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 125],
            msg: 'O sobrenome precisa conter entre 3 e 125 caracteres'
          }
        }
      },

      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'O campo Idade precisa conter um número inteiro'
          }
        }
      },

      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'O campo Peso precisa conter um número inteiro ou ponto flutuante'
          }
        }
      },

      altura: {
        type: Sequelize.FLOAT,
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
}
