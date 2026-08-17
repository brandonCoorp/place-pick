'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('category', [
      {
        id: 'a86e4096-7847-47a1-b723-5682c6880cc0',
        name: 'Casa',
        code: 'HOUSE',
        description: 'Casa independiente',
      },
      {
        id: 'a113df66-668a-4748-b281-522d70b235eb',
        name: 'Departamento',
        code: 'APARTMENT',
        description: 'Departamento',
      },
      {
        id: '45730d0a-769d-4240-ac4a-cd995bc7aa59',
        name: 'Cuarto',
        code: 'ROOM',
        description: 'Habitación o cuarto',
      },
      {
        id: '59bf9272-703f-421d-82ae-6044a32a6131',
        name: 'Terreno',
        code: 'LAND',
        description: 'Terreno urbano o rural',
      },
      {
        id: '55d089d6-029a-4a97-bf09-1ce8e40d4e29',
        name: 'Tienda',
        code: 'SHOP',
        description: 'Local comercial pequeño',
      },
      {
        id: '38112d9e-4ec2-4b52-855c-050d9ccbbf57',
        name: 'Oficina',
        code: 'OFFICE',
        description: 'Espacio para oficina',
      },
      {
        id: 'fd1987cc-4aa9-4774-b94a-2edcce027758',
        name: 'Galpón',
        code: 'WAREHOUSE',
        description: 'Depósito o galpón',
      },
      {
        id: '6e8e3783-0ab4-4cc3-b0cd-3baec26ff663',
        name: 'Local Comercial',
        code: 'COMMERCIAL',
        description: 'Local para negocio',
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('category', null, {});
  },
};