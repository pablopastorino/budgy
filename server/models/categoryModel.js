const mysql = require('mysql2/promise')
require('dotenv').config()
const { categoryQueries } = require('./database/queries')

class Category {
	static async connect() {
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME
		})
		return connection
	}

	static async getAll() {
		const connection = await this.connect()
		const query = categoryQueries.getAll
		const [categories] = await connection.execute(query)

		return categories
	}
}

module.exports = Category
