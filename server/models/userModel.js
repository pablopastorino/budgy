const mysql = require('mysql2/promise')
const validator = require('validator')
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
		const query = `SELECT * FROM ${process.env.DB_NAME}.users WHERE email = '${email}'`
		const [row] = await connection.execute(query)

		if (!row.length) throw Error('User does not exits')

		return row[0]
	}

	static async create(firstName, lastName, email, password) {
		if (!firstName || !lastName || !email || !password)
			throw Error('All fields must be filled')
		if (!validator.isEmail(email)) throw Error('Email is not valid')
		if (!validator.isStrongPassword(password))
			throw Error('Password is not strong enougth')

		// const salt = await bcrypt.genSalt(10)
		// const hash = await bcrypt.hash(password, salt)

		const connection = await this.connect()
		const query = `INSERT INTO ${process.env.DB_NAME}.users (first_name, last_name, email, password, registration_date) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', NOW())`
		await connection.execute(query)

		return this.get(email)
	}

	static async login(email, password) {
		if (!email || !password) throw Error('All fields must be filled')

		const user = await this.get(email)
		if (!user) throw Error('Invalid email')

		// const match = await bcrypt.compare(password, user.password)
		// if (!match) throw Error('Invalid password')

		const match = password === user.password
		if (!match) throw Error('Invalid password')

		return user
	}
}

module.exports = User
