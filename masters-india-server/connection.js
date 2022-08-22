const mysql = require('mysql');
const util = require('util')

const db_config = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'masters_india',
	port: 3306,
	multipleStatements: true
}

const connection = mysql.createConnection(db_config);

connection.query = util.promisify(connection.query);

module.exports = connection;