const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoute')

router.use('/users', userRoutes)

module.exports = router
