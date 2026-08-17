'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comfort', [
      {
        id: 'ad81bce2-4ee8-47a0-8e36-412999ded006',
        name: '1 Dormitorio',
        code: 'BEDROOM_1',
        description: 'Un dormitorio',
      },
      {
        id: '1b9d3664-c33a-406a-b32d-d91e3d1648be',
        name: '2 Dormitorios',
        code: 'BEDROOM_2',
        description: 'Dos dormitorios',
      },
      {
        id: '53f95527-5712-442f-8950-f2a17d467b09',
        name: '3 Dormitorios',
        code: 'BEDROOM_3',
        description: 'Tres dormitorios',
      },
      {
        id: 'ef62e3bf-10f0-49f1-a148-6011cb94e4d4',
        name: '1 Baño',
        code: 'BATHROOM_1',
        description: 'Un baño',
      },
      {
        id: '5c63e89f-73ca-4ab8-a5b8-f679f8b26148',
        name: '2 Baños',
        code: 'BATHROOM_2',
        description: 'Dos baños',
      },
      {
        id: '06a77ef4-270a-4696-8016-6abe660637ed',
        name: 'Garaje',
        code: 'GARAGE',
        description: 'Espacio para vehículo',
      },
      {
        id: '2e877057-7379-448e-a74f-647d83aa4346',
        name: 'Piscina',
        code: 'POOL',
        description: 'Piscina',
      },
      {
        id: '117cc14c-e5d8-48c1-98f5-fe7c4759b3c9',
        name: 'Salón Social',
        code: 'SOCIAL_HALL',
        description: 'Salón para eventos',
      },
      {
        id: '6dcf92b6-c45b-420f-9f8b-3effcd161f5b',
        name: 'Jardín',
        code: 'GARDEN',
        description: 'Área verde o jardín',
      },
      {
        id: '4982a25f-50e9-4a8c-87a8-066813769723',
        name: 'Parrillero',
        code: 'BBQ',
        description: 'Área para parrilladas',
      },
      {
        id: '6b5c71a5-c3a6-4938-85e7-2e64731bdf2e',
        name: 'Ascensor',
        code: 'ELEVATOR',
        description: 'Ascensor',
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('comfort', null, {});
  },
};