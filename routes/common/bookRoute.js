const express = require('express')
const router = express.Router()

const bookController = require('../../controllers/bookController')
const Validator = require('../../utils/validateRequest')

const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

router.post('/', Validator('book'), use(bookController.addBook))

router.get('/:id', use(bookController.getBook))

router.get('/', use(bookController.getAllBooks))

router.put('/:id', Validator('updateBook'), use(bookController.updateBook))

router.delete('/:id', use(bookController.deleteBook))

module.exports = router
