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

	static async getAll(id) {
		if (!id) throw Error('Invalid user')

		const connection = await this.connect()
		const query = transactionQueries.getAll(id)
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
		const query = transactionQueries.delete(id)
		const rows = await connection.execute(query)
	}

	static async create(ammount, date, score, userId, conceptId) {
		if (!ammount || !date || !score || !conceptId)
			throw Error('Complete all fields to create a transaction')

		const connection = await this.connect()
		const query = transactionQueries.create(
			ammount,
			date,
			score,
			userId,
			conceptId
		)
		const [result] = await connection.execute(query)

		return result.insertId
	}
}

module.exports = Transaction
