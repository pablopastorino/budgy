const User = require('../models/userModel')

const getUser = async (req, res) => {
	const { email } = req.body
	try {
		const user = await User.get(email)
		return res.status(200).json({ user })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const loginUser = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await User.login(email, password)
		return res.status(200).json({ user })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const signupUser = async (req, res) => {
	const { firstName, lastName, email, password } = req.body
	try {
		await User.create(firstName, lastName, email, password)
		return res.status(200).json({ firstName, password })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	getUser,
	loginUser,
	signupUser
}
