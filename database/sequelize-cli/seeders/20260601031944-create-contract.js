'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('type_contract', [
      {
        id: 'deca80d1-642d-4c77-b422-9829fa2b6272',
        name: 'Venta',
        code: 'SALE',
        description: 'Venta definitiva del inmueble',
        status: true,
      },
      {
        id: '07f6f6da-322a-4e9a-bc99-c30d09985677',
        name: 'Alquiler',
        code: 'RENT',
        description: 'Alquiler mensual',
        status: true,
      },
      {
        id: '42606a49-2cd7-4b93-bac1-4548dd798f12',
        name: 'Anticrético',
        code: 'ANTICRETIC',
        description: 'Contrato de anticrético',
        status: true,
      },
      {
        id: '319d3bd8-3f44-4c94-9b0e-86622fb715b7',
        name: 'Por Día',
        code: 'DAY',
        description: 'Alquiler por día',
        status: true,
      },
      {
        id: 'f85f8dff-67ba-4108-88e0-83f859a8b9c3',
        name: 'Por Semana',
        code: 'WEEK',
        description: 'Alquiler por semana',
        status: true,
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('type_contract', null, {});
  },
};