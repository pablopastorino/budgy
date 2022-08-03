const Category = require('../models/categoryModel')

const getAll = async (req, res) => {
	try {
		const categories = await Category.getAll()
		res.status(200).json({ categories })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	getAll
}
