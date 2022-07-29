const express = require('express')
const router = express.Router()
const {
	getUser,
	loginUser,
	signupUser
} = require('../controllers/usersController')

router.use(express.json())

router.post('/', getUser)
router.post('/login', loginUser)
router.post('/signup', signupUser)

module.exports = router
