const mysql = require('mysql2/promise')
require('dotenv').config()
const { createQuery, insertCategories } = require('./queries')
const fs = require('fs')

class Database {
	static async connect() {
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME
		})
		return connection
	}

	static async create() {
		console.log(process.cwd())
		const connection = await this.connect()
		await connection.execute(
			fs.readFileSync('./models/database/create-database.sql').toString()
		)
		await connection.execute(insertCategories)
	}
}

module.exports = Database
