const mysql = require('mysql2/promise')
const validator = require('validator')
const bcrypt = require('bcrypt')
const { userQueries } = require('./database/queries')
require('dotenv').config()

class User {
	static async connect() {
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME
		})
		return connection
	}

	static async get(email) {
		if (!email) throw Error('Enter email')
		if (!validator.isEmail(email)) throw Error('Enter a valid email')

		const connection = await this.connect()
		const query = userQueries.get(email)
		const [row] = await connection.execute(query)

		if (!row.length) throw Error('Invalid credentials!')

		return row[0]
	}

	static async getById(id) {
		if (!id) throw Error('Invalid id')

		const connection = await this.connect()
		const query = userQueries.getById(id)
		const [row] = await connection.execute(query)

		if (!row.length) throw Error('User does not exists')

		return row[0]
	}

	static async create(firstName, lastName, email, password) {
		if (!firstName || !lastName || !email || !password)
			throw Error('All fields must be filled')
		if (!validator.isEmail(email))
			throw Error(`'${email}' is not a valid email`)
		if (!validator.isStrongPassword(password))
			throw Error('Weak password, try harder!')

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const connection = await this.connect()
		const query = userQueries.create(firstName, lastName, email, hash)
		const [result] = await connection.execute(query)
		return result.insertId
	}

	static async login(email, password) {
		if (!email || !password) throw Error('All fields must be filled')

		const user = await this.get(email)
		if (!user) throw Error('Invalid credentials!')

		const match = await bcrypt.compare(password, user.password)
		if (!match) throw Error('Invalid credentials!')

		return user
	}
}

module.exports = User
