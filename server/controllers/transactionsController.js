const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')

const getAll = async (req, res) => {
	const { email } = req.body
	try {
		const transactions = await Transaction.getAll(email)
		res.status(200).json({ transactions })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const remove = async (req, res) => {
	const { id } = req.body
	try {
		const [row] = await Transaction.get(id)
		console.log(row)
		if (!row) return res.status(404).json({ error: 'No such record' })

		await Transaction.remove(id)
		res.status(200).json({ transaction: row })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const create = async (req, res) => {
	const { ammount, date, score, email, concept, category } = req.body

	try {
		const [existingConcept] = await Transaction.getConcept(concept)
		let conceptId
		if (!existingConcept) {
			const { insertId } = await Transaction.createConcept(
				concept,
				category
			)
			conceptId = insertId
		} else if (existingConcept) {
			conceptId = existingConcept.id
		}

		const [transaction] = await Transaction.create(
			ammount,
			date,
			score,
			email,
			conceptId
		)

		res.status(200).json({ transaction })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	getAll,
	remove,
	create
}
