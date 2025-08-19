
import { Sequelize, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 150],
            msg: 'O campo nome deve conter dentre 3 á 150 caracteres'
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
            msg: 'Email Inválido'
          }
        }
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'O campo password deve conter dentre 6 á 50 caracteres'
          }
        }
      }

    }, {
      sequelize
    });

    this.addHook('beforeSave', async (user) => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    })
    return this;
  }

  passwordIsValid(password){
    return bcrypt.compare(password, this.password_hash)
  }
}
