import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js';
import Aluno from '../models/Aluno.js';
import User from '../models/User.js';
import Image from '../models/Image.js';

const models = [Aluno, User, Image];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig.development);

    models.forEach(model => {
      model.init(this.connection);
    });

    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
