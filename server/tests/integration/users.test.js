const supertest = require('supertest')
require('dotenv').config()
const { app, server } = require('../../server')
const User = require('../../models/userModel')
const { initialUsers } = require('../helpers/helpers')

const api = supertest(app)

beforeEach(async () => {
	await User.delete()

	for await (let user of initialUsers) {
		await User.signup(user)
	}
})

afterAll(async () => {
	server.close()
})

test('should return users in JSON format', async () => {
	await api
		.get('/api/user')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('should return initial users', async () => {
	const response = await api.get('/api/user').expect(200)
	expect(response.body).toHaveLength(initialUsers.length)
})

test('should signup the user', async () => {
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
	expect(response.body).toHaveProperty('token')

	const getResponse = await api.get('/api/user')
	expect(getResponse.body).toHaveLength(initialUsers.length + 1)
})

test('should not signup an existing user', async () => {
	await api
		.post('/api/user/signup')
		.set('Content-Type', 'Application/json')
		.set('Accept', 'application/json')
		.send({
			firstName: 'Existing',
			lastName: 'Mail',
			email: 'first@test.com',
			password: '12345'
		})
		.expect(400)
})

test('should not signup when firstName is missing or less than two characters length', async () => {
	await api
		.post('/api/user/signup')
		.set('Content-Type', 'Application/json')
		.set('Accept', 'application/json')
		.send({
			firstName: '',
			lastName: 'root',
			email: 'test@mail.com',
			password: '12345'
		})
		.expect(400)
		.expect(res => {
			const resString = /first name/i
			if (!resString.test(res.body.error)) throw Error('Failed checking "firstName" precense')
		})

	await api
		.post('/api/user/signup')
		.set('Content-Type', 'Application/json')
		.set('Accept', 'application/json')
		.send({
			firstName: 'a',
			lastName: 'root',
			email: 'test@mail.com',
			password: '12345'
		})
		.expect(400)
		.expect(res => {
			const resString = /length/i
			if (!resString.test(res.body.error)) throw Error('Failed checking "firstName" length')
		})
})
