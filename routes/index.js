const express = require('express')
const router = express.Router()

const auth = require('./auth/index')
const admin = require('./admin/index')
const common = require('./common/index')

const authorize = require('../middleware/jwtAuth')

router.use('/auth', auth)
router.use('/admin', authorize(['admin']), admin)
router.use('/common', authorize(['admin', 'user']), common)

module.exports = router
