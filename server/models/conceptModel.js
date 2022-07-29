const mysql = require('mysql2/promise')
require('dotenv').config()
const { conceptQueries } = require('./database/queries')

class Concept {
	static async connect() {
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME
		})
		return connection
	}

	static async get(conceptText) {
		if (!conceptText) throw Error('Add a concept')

		const connection = await this.connect()
		const query = conceptQueries.get(conceptText)
		const [concept] = await connection.execute(query)

		return concept
	}

	static async create(name, category) {
		if (!name || !category) throw Error('Missing some fields')

		const connection = await this.connect()
		const query = conceptQueries.create(name, category)
		const [id] = await connection.execute(query)

		return id
	}
}

module.exports = Concept
