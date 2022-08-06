const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const prisma = new PrismaClient()

const requireAuth = async (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization)
		return res.status(400).json({ error: 'Authorization token required' })

	const token = authorization.split(' ').pop()

	try {
		const { id } = jwt.verify(token, process.env.SECRET)
		req.user = await prisma.User.findUnique({ where: { id } })
		next()
	} catch (error) {
		res.status(401).json({ error: 'Request is not authorized' })
	}
}

module.exports = requireAuth
