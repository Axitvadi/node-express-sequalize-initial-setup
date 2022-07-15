const express = require('express')
const router = express.Router()

const userController = require('../../controllers/userController')
const Validator = require('../../utils/validateRequest')

const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

router.get('/:id', use(userController.getUser))

router.get('/', use(userController.getAllUsers))

router.put(
  '/:id',
  Validator('updateUser'),
  use(userController.updateUser)
)

router.delete('/:id', use(userController.deleteUser))

module.exports = router
