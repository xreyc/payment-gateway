require('dotenv').config();
// we use require if this file is not linked to the main file

module.exports = process.env.STAGE == 'local' ?
	{
		username: process.env.DB_USER_NAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST_NAME,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
		logging: false,
	} : {
		username: process.env.DB_USER_NAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST_NAME,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
		dialectOptions: {
			ssl: {
				rejectUnauthorized: false,
				ca: process.env.DB_CACERT, // ${_self.CA_CERT}
			},
		},
		logging: false,
	};