const express = require('express')
const router = express.Router()
const {
	getAll,
	remove,
	create
} = require('../controllers/transactionsController')

router.use(express.json())

router.post('/', getAll)
router.delete('/', remove)
router.post('/new', create)

module.exports = router
