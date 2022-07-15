const express = require('express')
const router = express.Router()

const { login, register } = require('../../controllers/authController.js')
const Validator = require('../../utils/validateRequest')

const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

router.post('/login', Validator('login'), use(login))
router.post('/register', Validator('registerUser'), use(register))

module.exports = router
