'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rule', [
      {
        id: '2d17cc75-f15a-40da-8e77-df828a0a6e84',
        name: 'Sin Mascotas',
        code: 'NO_PETS',
        description: 'No se permiten mascotas',
      },
      {
        id: '5ca9961d-e592-4a01-a7cf-29ec5efe9e51',
        name: 'Con Mes Adelantado',
        code: 'ADVANCE_PAYMENT',
        description: 'Pago de un mes adelantado',
      },
      {
        id: 'f8ed867c-9037-41eb-b679-f395c73fce83',
        name: 'Contrato Mínimo 1 Año',
        code: 'MIN_1_YEAR',
        description: 'Contrato mínimo de un año',
      },
      {
        id: '1fe6499e-b690-4ff2-b816-f0c078bf4ed0',
        name: 'Contrato Mínimo 2 Años',
        code: 'MIN_2_YEARS',
        description: 'Contrato mínimo de dos años',
      },
      {
        id: '84601a8d-d733-45ad-9e7e-b2ef0a116703',
        name: 'Sin Niños',
        code: 'NO_CHILDREN',
        description: 'No se permiten niños',
      },
      {
        id: 'c3b8bcc1-c6d8-4069-a9d9-8e8acb10498a',
        name: 'No Fumadores',
        code: 'NO_SMOKING',
        description: 'No se permite fumar',
      },
      {
        id: '3aa6eca9-42ed-4f0b-852e-125074fb73ea',
        name: 'Garantía Requerida',
        code: 'GUARANTEE',
        description: 'Se requiere garantía',
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('rule', null, {});
  },
};