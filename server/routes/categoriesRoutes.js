const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const { getAll } = require('../controllers/categoriesController')

router.use(express.json())
router.use(requireAuth)

router.get('/', getAll)

module.exports = router
