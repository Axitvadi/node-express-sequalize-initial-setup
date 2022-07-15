const express = require('express')
const router = express.Router()

const userController = require('../../controllers/bookController')
const Validator = require('../../utils/validateRequest')

const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

router.post('/', Validator('book'), use(userController.addBook))

router.get('/:id', use(userController.getBook))

router.get('/', use(userController.getAllBooks))

router.put('/:id', Validator('updateBook'), use(userController.updateBook))

router.delete('/:id', use(userController.deleteBook))

module.exports = router
