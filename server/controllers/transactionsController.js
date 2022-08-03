const Transaction = require('../models/transactionModel')
const Concept = require('../models/conceptModel')

const getAll = async (req, res) => {
	const { id } = req.user
	try {
		const transactions = await Transaction.getAll(id)
		res.status(200).json({ transactions })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const remove = async (req, res) => {
	const { id } = req.params
	try {
		const [row] = await Transaction.get(id)
		if (!row) return res.status(404).json({ error: 'No such record' })

		await Transaction.remove(id)
		res.status(200).json({ transaction: row })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const create = async (req, res) => {
	const { ammount, date, score, concept, category } = req.body

	try {
		const [existingConcept] = await Concept.get(concept)
		let conceptId
		if (!existingConcept) {
			const { insertId } = await Concept.create(concept, category)
			conceptId = insertId
		} else if (existingConcept) {
			conceptId = existingConcept.id
		}

		const id = await Transaction.create(
			ammount,
			date,
			score,
			req.user.id,
			conceptId
		)

		res.status(200).json({ id, ...req.body })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	getAll,
	remove,
	create
}
