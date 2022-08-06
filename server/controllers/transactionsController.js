const Transaction = require('../models/transactionModel')

const getAll = async (req, res) => {
	const {
		id
	} = req.user
	try {
		const transactions = await Transaction.getAll(id)
		res.status(200).json({
			transactions
		})
	} catch (error) {
		res.status(400).json({
			error: error.message
		})
	}
}

const remove = async (req, res) => {
	try {
		const transaction = await Transaction.remove(req.params.id)
		res.status(200).json({
			transaction
		})
	} catch (error) {
		res.status(400).json({
			error: error.message
		})
	}
}

const create = async (req, res) => {
	const newTransaction = {
		...req.body,
		userId: req.user.id
	}

	const {
		error
	} = Transaction.validateTransaction(newTransaction)

	try {
		if (error) throw Error(error.details[0].message)
		const transaction = await Transaction.create(newTransaction)

		res.status(200).json({
			transaction
		})

	} catch (error) {
		res.status(400).json({
			error: error.message
		})
	}
}

module.exports = {
	getAll,
	remove,
	create
}