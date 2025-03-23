'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database/config');

const db = {};

/** Create a sequelize instance - with db connection */
let sequelize = new Sequelize(config.database, config.username, config.password, config);

/** Add the models to the object */
db.Payment = require('./Payment')(sequelize, DataTypes);

/** This runs all the association */
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

/** Add sequelize to do object */
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
