const mysql = require('mysql2/promise')
const validator = require('validator')
const { transactionQueries } = require('./database/queries')
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
		const query = transactionQueries.getAll(email)
		const [rows] = await connection.execute(query)

		if (!rows.length) throw Error('There are no transactions yet')

		return rows
	}

	static async get(id) {
		if (!id) throw Error('Invalid id')

		const connection = await this.connect()
		const query = transactionQueries.get(id)
		const [rows] = await connection.execute(query)

		return rows
	}

	static async remove(id) {
		if (!id) throw Error('Invalid id')

		const connection = await this.connect()
		const query = transactionQueries.delet(id)
		const rows = await connection.execute(query)
	}

	static async create(ammount, date, score, email, conceptId) {
		const { id: userId } = await User.get(email)

		const connection = await this.connect()
		const query = transactionQueries.create(
			ammount,
			date,
			score,
			userId,
			conceptId
		)
		const result = await connection.execute(query)

		return result
	}
}

module.exports = Transaction
