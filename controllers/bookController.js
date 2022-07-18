const db = require('../database/conn')
const { Book } = db
const { prepareSuccessResponse } = require('../utils/responseHandler')

exports.addBook = async (req, res) => {
  const newBook = new Book({
    name: req.body.name,
    description: req.body.description,
    published_on: req.body.published_on,
    isbn: req.body.isbn
  })

  const book = await newBook.save()
  const result = {
    id: book.id,
    name: book.name
  }

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'Book saved successfully'))
}

exports.getBook = async (req, res) => {
  const id = req.params.id
  const book = await Book.findByPk(id)
  if (!book) {
    const error = new Error('Could not find book.')
    error.statusCode = 404
    throw error
  }

  const result = {
    id: book.id,
    name: book.name,
    description: book.description,
    published_on: book.published_on,
    isbn: book.isbn
  }

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'Book retrieved successfully'))
}

exports.getAllBooks = async (req, res) => {
  const books = await Book.findAll()
  if (!books) {
    const error = new Error('Books not found.')
    error.statusCode = 404
    throw error
  }

  const result = books

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'Books retrieved successfully.'))
}

exports.updateBook = async (req, res) => {
  const id = req.params.id

  const preBook = {
    name: req.body.name,
    description: req.body.description,
    published_on: req.body.published_on,
    isbn: req.body.isbn
  }

  const book = await Book.update(preBook, { where: { id } })

  if (!book) {
    const error = new Error('Could not find book.')
    error.statusCode = 404
    throw error
  }

  const result = {
    id: book.id,
    name: book.name,
    description: book.description,
    published_on: book.published_on,
    isbn: book.isbn
  }

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'Book updated successfully.'))
}

exports.deleteBook = async (req, res, next) => {
  const id = req.params.id
  const book = await Book.destroy({ where: { id } })
  if (!book) {
    const error = new Error('Could not find book.')
    error.statusCode = 404
    throw error
  }

  return res
    .status(200)
    .json(prepareSuccessResponse({}, 'Book deleted successfully.'))
}
