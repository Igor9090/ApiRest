import { Sequelize, Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Image extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: "O Campo não pode estar vazio"
          }
        }
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: "O Campo não pode estar vazio"
          }
        }
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`
        }
      }
    }, {
      sequelize,
      tableName: 'images',
      underscored: true,
    });

  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: "aluno_id" }); 
  }
}
