"use strict";'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('alunos', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });


    await queryInterface.addConstraint('alunos', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_alunos'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('alunos', 'unique_email_alunos');
    await queryInterface.changeColumn('alunos', 'email', {
      type: Sequelize.STRING
    });
  }
};
