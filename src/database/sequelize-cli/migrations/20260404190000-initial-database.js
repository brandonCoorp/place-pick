'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // ---------------------------------------------------------
    // Order 1: Tables without initial FK dependencies
    // ---------------------------------------------------------

    // 1. category
    await queryInterface.createTable('category', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      name: { type: Sequelize.STRING, allowNull: false },
      code: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 2. type_contract
    await queryInterface.createTable('type_contract', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      name: { type: Sequelize.STRING, allowNull: false },
      code: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.STRING },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 3. rule
    await queryInterface.createTable('rule', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      name: { type: Sequelize.STRING, allowNull: false },
      code: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 4. comfort
    await queryInterface.createTable('comfort', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      name: { type: Sequelize.STRING, allowNull: false },
      code: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 5. customer
    await queryInterface.createTable('customer', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      phone: { type: Sequelize.STRING },
      phone_code: { type: Sequelize.STRING },
      first_name: { type: Sequelize.STRING, allowNull: false },
      last_name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, unique: true },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 6. owner
    await queryInterface.createTable('owner', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      phone: { type: Sequelize.STRING },
      phone_code: { type: Sequelize.STRING },
      first_name: { type: Sequelize.STRING, allowNull: false },
      last_name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, unique: true },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 7. zone (Zone in diagram)
    await queryInterface.createTable('zone', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      latitud: { type: Sequelize.DECIMAL(10, 8) },
      longitud: { type: Sequelize.DECIMAL(11, 8) },
      radius_in_meters: { type: Sequelize.INTEGER },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // ---------------------------------------------------------
    // Order 2: Tables dependent on Order 1
    // ---------------------------------------------------------

    // 8. property
    await queryInterface.createTable('property', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      zone_id: {
        type: Sequelize.UUID,
        references: { model: 'zone', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      price: { type: Sequelize.DECIMAL(20, 2) },
      currency: { type: Sequelize.STRING, defaultValue: 'USD' },
      address: { type: Sequelize.STRING },
      area: { type: Sequelize.DECIMAL(10, 2) },
      status: { type: Sequelize.STRING, defaultValue: 'available' },
      latitud: { type: Sequelize.DECIMAL(10, 8) },
      longitud: { type: Sequelize.DECIMAL(11, 8) },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 9. interactions
    await queryInterface.createTable('interactions', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      customer_id: { type: Sequelize.STRING },
      action: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      view: { type: Sequelize.STRING },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 10. image
    await queryInterface.createTable('image', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      property_id: {
        type: Sequelize.UUID,
        references: { model: 'property', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      url: { type: Sequelize.TEXT, allowNull: false },
      priority: { type: Sequelize.INTEGER, defaultValue: 0 },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // ---------------------------------------------------------
    // Order 3: Join Tables and More Dependent Tables
    // ---------------------------------------------------------

    // 11. property_category
    await queryInterface.createTable('property_category', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      property_id: {
        type: Sequelize.UUID,
        references: { model: 'property', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id: {
        type: Sequelize.UUID,
        references: { model: 'category', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 12. property_comfort
    await queryInterface.createTable('property_comfort', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      property_id: {
        type: Sequelize.UUID,
        references: { model: 'property', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      comfort_id: {
        type: Sequelize.UUID,
        references: { model: 'comfort', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 13. property_type_contract
    await queryInterface.createTable('property_type_contract', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      property_id: {
        type: Sequelize.UUID,
        references: { model: 'property', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      type_contract_id: {
        type: Sequelize.UUID,
        references: { model: 'type_contract', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 14. property_rule
    await queryInterface.createTable('property_rule', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      property_id: {
        type: Sequelize.UUID,
        references: { model: 'property', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rule_id: {
        type: Sequelize.UUID,
        references: { model: 'rule', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 15. property_owner
    await queryInterface.createTable('property_owner', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      property_id: {
        type: Sequelize.UUID,
        references: { model: 'property', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      owner_id: {
        type: Sequelize.UUID,
        references: { model: 'owner', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: { type: Sequelize.STRING, defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // 16. contract
    await queryInterface.createTable('contract', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      property_id: {
        type: Sequelize.UUID,
        references: { model: 'property', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      customer_id: {
        type: Sequelize.UUID,
        references: { model: 'customer', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      type_contract_id: {
        type: Sequelize.UUID,
        references: { model: 'type_contract', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      start_date: { type: Sequelize.DATE },
      end_date: { type: Sequelize.DATE },
      price: { type: Sequelize.DECIMAL(20, 2) },
      status: { type: Sequelize.STRING, defaultValue: 'pending' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

  },

  async down(queryInterface, Sequelize) {
    // Drop in reverse order of creation
    await queryInterface.dropTable('contract');
    await queryInterface.dropTable('property_owner');
    await queryInterface.dropTable('property_rule');
    await queryInterface.dropTable('property_type_contract');
    await queryInterface.dropTable('property_comfort');
    await queryInterface.dropTable('property_category');
    await queryInterface.dropTable('image');
    await queryInterface.dropTable('interactions');
    await queryInterface.dropTable('property');
    await queryInterface.dropTable('zone');
    await queryInterface.dropTable('owner');
    await queryInterface.dropTable('customer');
    await queryInterface.dropTable('comfort');
    await queryInterface.dropTable('rule');
    await queryInterface.dropTable('type_contract');
    await queryInterface.dropTable('category');
  }
};
