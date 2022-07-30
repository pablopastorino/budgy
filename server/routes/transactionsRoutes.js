const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
const {
	getAll,
	remove,
	create
} = require('../controllers/transactionsController')

router.use(express.json())
router.use(requireAuth)

router.get('/', getAll)
router.delete('/:id', remove)
router.post('/', create)

module.exports = router
