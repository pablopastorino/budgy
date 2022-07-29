const mysql = require('mysql2/promise')
const validator = require('validator')
require('dotenv').config()
const User = require('./userModel')

class Transaction {
	static async connect() {
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME
		})
		return connection
	}

	static async getAll(email) {
		if (!email) throw Error('Enter email')
		if (!validator.isEmail(email)) throw Error('Enter a valid email')

		const connection = await this.connect()
		const query = `SELECT t.id, t.ammount, t.registraton_date, t.score, co.name AS concept, ca.name AS category
			FROM ${process.env.DB_NAME}.transactions t
			LEFT JOIN ${process.env.DB_NAME}.concepts co ON co.id = t.concepts_id
			LEFT JOIN ${process.env.DB_NAME}.categories ca ON co.categories_id = ca.id
			WHERE t.users_id = (SELECT id FROM ${process.env.DB_NAME}.users WHERE email = '${email}')`

		const [rows] = await connection.execute(query)

		if (!rows.length) throw Error('There are no transactions yet')

		return rows
	}

	static async get(id) {
		if (!id) throw Error('Invalid id')

		const connection = await this.connect()
		const query = `SELECT * FROM ${process.env.DB_NAME}.transactions WHERE id = ${id}`
		const [rows] = await connection.execute(query)

		return rows
	}

	static async remove(id) {
		if (!id) throw Error('Invalid id')

		const connection = await this.connect()
		const query = `DELETE FROM ${process.env.DB_NAME}.transactions WHERE id = ${id}`
		const rows = await connection.execute(query)
	}

	static async getConcept(conceptText) {
		if (!conceptText) throw Error('Add a concept')

		const connection = await this.connect()
		const query = `SELECT id FROM ${process.env.DB_NAME}.concepts WHERE name REGEXP '^${conceptText}$';`
		const [concept] = await connection.execute(query)

		return concept
	}

	static async createConcept(name, category) {
		if (!name || !category) throw Error('Missing some fields')

		const connection = await this.connect()
		const query = `INSERT INTO ${process.env.DB_NAME}.concepts (name, categories_id) VALUES ('${name}', '${category}');`
		const [id] = await connection.execute(query)

		return id
	}

	static async create(ammount, date, score, email, conceptId) {
		const { id: userId } = await User.get(email)

		const connection = await this.connect()
		const query = `INSERT INTO ${process.env.DB_NAME}.transactions (ammount, registraton_date, score, users_id, concepts_id) VALUES ('${ammount}', '${date}', '${score}', '${userId}', '${conceptId}');`
		const result = await connection.execute(query)

		return result
	}
}

module.exports = Transaction
