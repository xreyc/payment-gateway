'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('payments', {
			payment_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			payment_uuid: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			payment_reference: {
				type: Sequelize.STRING(50),
				allowNull: false
			},
			description: {
				type: Sequelize.STRING(50),
				allowNull: true
			},
			payment_method: {
				type: Sequelize.STRING(20),
				allowNull: false
			},
			amount: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false
			},
			currency: {
				type: Sequelize.STRING(3),
				allowNull: false,
				defaultValue: "PHP"
			},
			status: {
				type: Sequelize.STRING(20),
				allowNull: false,
				defaultValue: "PENDING"
			},
			payment_date: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			confirmation_date: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			checkout_id: {
				type: Sequelize.STRING(250),
				allowNull: false,
			},
			checkout_url: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			checkout_session_data: {
				type: Sequelize.JSON,
				allowNull: true
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: true
			},
			metadata: {
				type: Sequelize.JSONB,
				allowNull: true,
				defaultValue: {
					version: 0
				}
			}
		});
		/** Add indexes reference */
		await queryInterface.addIndex('payments', ['payment_uuid'], {
			name: 'payments_payment_uuid_idx',
			unique: true
		});
		await queryInterface.addIndex('payments', ['user_id'], {
			name: 'payments_user_id_idx',
			unique: false
		});
		await queryInterface.addIndex('payments', ['payment_reference'], {
			name: 'payments_payment_reference_idx',
			unique: false
		});
		await queryInterface.addIndex('payments', ['checkout_id'], {
			name: 'payments_checkout_id_idx',
			unique: false
		});
		/** Add foreign key constraints */
		await queryInterface.addConstraint('payments', {
			name: 'payments_user_id_fk',
			fields: ['user_id'],
			type: 'foreign key',
			references: {
				table: 'users',
				field: 'user_id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		});
	},
	async down(queryInterface, Sequelize) {
		/** Remove the foreign key constraints */
		await queryInterface.removeConstraint('payments', 'payments_user_id_fk');
		/** Remove indexes */
		await queryInterface.removeIndex('payments', 'payments_payment_uuid_idx');
		await queryInterface.removeIndex('payments', 'payments_user_id_idx');
		await queryInterface.removeIndex('payments', 'payments_payment_reference_idx');
		await queryInterface.removeIndex('payments', 'payments_checkout_id_idx');
		/** Drop table */
		await queryInterface.dropTable('payments');
	}
};