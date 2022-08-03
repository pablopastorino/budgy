const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization)
		return res.status(400).json({ error: 'Authorization token required' })

	const token = authorization.split(' ').pop()

	try {
		const { id } = jwt.verify(token, process.env.SECRET)
		console.log(id)
		req.user = await User.getById(id)
		next()
	} catch (error) {
		res.status(401).json({ error: 'Request is not authorized' })
	}
}

module.exports = requireAuth
