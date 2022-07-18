const express = require('express')
const router = express.Router()

const authController = require('../../controllers/authController.js')
const Validator = require('../../utils/validateRequest')

const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

router.post('/login', Validator('login'), use(authController.login))
router.post('/register', Validator('registerUser'), use(authController.register))

module.exports = router
