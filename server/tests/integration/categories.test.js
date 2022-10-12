const supertest = require('supertest')
require('dotenv').config()
const { app, server } = require('../../server')
const User = require('../../models/userModel')
const { initialUsers } = require('../helpers/helpers')

const api = supertest(app)

let user

beforeEach(async () => {
	await User.delete()

	const response = await api
		.post('/api/user/signup')
		.set('Content-Type', 'Application/json')
		.set('Accept', 'application/json')
		.send({
			firstName: 'root',
			lastName: 'root',
			email: 'root@mail.com',
			password: '12345'
		})
		.expect(200)
	user = response.body
})

test('should respond with the categories if valid user is provided', async () => {
	const response = await api
		.get('/api/categories')
		.set('Authorization', `Bearer ${user.token}`)
		.set('Content-Type', 'application/json')
		.expect(200)
})

afterAll(async () => {
	await server.close()
})
