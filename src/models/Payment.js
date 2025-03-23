'use strict';
const { Model } = require('sequelize');

const { User } = require('./user');

module.exports = (sequelize, DataTypes) => {
	class Payment extends Model {
		static associate(models) {
		}
	}
	Payment.init({
		payment_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'user_id'
			}
		},
		payment_reference: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		payment_method: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false
		},
		currency: {
			type: DataTypes.STRING(3),
			allowNull: false,
			defaultValue: "PHP"
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: "PENDING"
		},
		payment_date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		confirmation_date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		checkout_id: {
			type: DataTypes.STRING(250),
			allowNull: false,
		},
		checkout_url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		checkout_session_data: {
			type: DataTypes.JSON,
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		metadata: {
			type: DataTypes.JSONB,
			allowNull: true,
			defaultValue: {
				version: 0
			}
		}
	}, {
		sequelize,
		modelName: 'Payment',
		tableName: 'payments',
		underscored: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		timestamps: false
	});
	return Payment;
};