const { PrismaClient } = require('@prisma/client')
const Joi = require('joi')
const bcrypt = require('bcrypt')
require('dotenv').config()

const prisma = new PrismaClient()

class User {
	static async signup(user) {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(user.password, salt)

		const newUser = await prisma.User.create({
			data: {
				...user,
				password: hash,
				registrationDate: new Date().toISOString()
			}
		})

		return newUser
	}

	static async login(user) {
		const isPresent = await prisma.User.findUnique({
			where: { email: user.email }
		})
		if (!isPresent) throw Error('Invalid credentials!')

		const match = await bcrypt.compare(user.password, isPresent.password)
		if (!match) throw Error('Invalid credentials!')

		return isPresent
	}

	static validateSignup(user) {
		const schema = Joi.object({
			firstName: Joi.string().min(2).required().label('First Name'),
			lastName: Joi.string().min(2).required().label('Last Name'),
			email: Joi.string().email().required().label('Email'),
			password: Joi.string().min(5).required().label('Password')
		})
		return schema.validate(user)
	}

	static validateLogin(user) {
		const schema = Joi.object({
			email: Joi.string().email().required().label('Email'),
			password: Joi.string().min(5).required().label('Password')
		})
		return schema.validate(user)
	}
}

module.exports = User
