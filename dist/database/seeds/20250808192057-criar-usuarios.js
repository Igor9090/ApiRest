"use strict";'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        nome: 'John',
        email: 'jonh@email.com',
        password_hash: await bcrypt.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Mario',
        email: 'mario@email.com',
        password_hash: await bcrypt.hash('654321', 8),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Dexter',
        email: 'dexter@email.com',
        password_hash: await bcrypt.hash('D.morgan', 8),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
