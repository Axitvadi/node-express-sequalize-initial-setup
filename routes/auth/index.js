const express = require('express')
const router = express.Router()
const authRoute = require('../auth/authRoute')

router.use('/', authRoute)

module.exports = router
