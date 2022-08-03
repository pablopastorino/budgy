const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
const { getAll } = require('../controllers/categoriesController')

router.use(express.json())

router.get('/', getAll)

module.exports = router
