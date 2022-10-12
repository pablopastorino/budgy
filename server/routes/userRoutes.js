const express = require('express')
const router = express.Router()
const { loginUser, signupUser, getUsers } = require('../controllers/usersController')

router.use(express.json())

router.get('/', getUsers)
router.post('/login', loginUser)
router.post('/signup', signupUser)

module.exports = router
