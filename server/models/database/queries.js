require('dotenv').config()

const userQueries = {
	get: email =>
		`SELECT * FROM ${process.env.DB_NAME}.users WHERE email = '${email}'`,
	getById: id =>
		`SELECT * FROM ${process.env.DB_NAME}.users WHERE id = '${id}'`,
	create: (firstName, lastName, email, password) =>
		`INSERT INTO ${process.env.DB_NAME}.users (first_name, last_name, email, password, registration_date) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', NOW())`
}

const conceptQueries = {
	get: conceptText =>
		`SELECT id FROM ${process.env.DB_NAME}.concepts WHERE name REGEXP '^${conceptText}$';`,
	create: (name, category) =>
		`INSERT INTO ${process.env.DB_NAME}.concepts (name, categories_id) VALUES ('${name}', '${category}');`
}

const categoryQueries = {
	getAll: `SELECT * FROM ${process.env.DB_NAME}.categories`
}

const transactionQueries = {
	getAll: id => `SELECT t.id, t.ammount, t.registraton_date, t.score, co.name AS concept, ca.name AS category
        FROM ${process.env.DB_NAME}.transactions t
        LEFT JOIN ${process.env.DB_NAME}.concepts co ON co.id = t.concepts_id
        LEFT JOIN ${process.env.DB_NAME}.categories ca ON co.categories_id = ca.id
        WHERE t.users_id = ${id}`,
	get: id =>
		`SELECT * FROM ${process.env.DB_NAME}.transactions WHERE id = ${id}`,
	delete: id =>
		`DELETE FROM ${process.env.DB_NAME}.transactions WHERE id = ${id}`,
	create: (ammount, date, score, userId, conceptId) =>
		`INSERT INTO ${process.env.DB_NAME}.transactions (ammount, registraton_date, score, users_id, concepts_id) VALUES ('${ammount}', '${date}', '${score}', '${userId}', '${conceptId}');`
}

const insertCategories = `INSERT INTO ${process.env.DB_NAME}.categories (name, is_earning) 
	VALUES
		('housing', 0),
		('transportation', 0),
		('food', 0),
		('utilities', 0),
		('insurance', 0),
		('medical & healthcare', 0),
		('saving, investing & debt payments',	0),
		('personal spending', 0),
		('recreation & entertainment',0),
		('miscellaneous', 0),
		('salary & wages', 1),
		('investment', 1),
		('business', 1),
		('interests', 1),
		('rental', 1),
		('other', 1);`

module.exports = {
	categoryQueries,
	conceptQueries,
	userQueries,
	transactionQueries,
	insertCategories
}
