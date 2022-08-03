const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = id => {
	return jwt.sign({ id }, process.env.SECRET, { expiresIn: '10d' })
}

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
		const { id, first_name: firstName } = user
		const token = createToken(user.id)
		return res.status(200).json({ id, firstName, email, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const signupUser = async (req, res) => {
	const { firstName, lastName, email, password } = req.body
	try {
		const id = await User.create(firstName, lastName, email, password)
		const token = createToken(id)
		return res.status(200).json({ id, firstName, email, token })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	getUser,
	loginUser,
	signupUser
}
