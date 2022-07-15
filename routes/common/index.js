const express = require('express')
const router = express.Router()
const bookRoutes = require('./bookRoute')

router.use('/books', bookRoutes)

module.exports = router
