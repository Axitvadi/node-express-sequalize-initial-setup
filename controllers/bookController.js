const Book = require('../models/book')
const { prepareSuccessResponse } = require('../utils/responseHandler')

exports.addBook = async (req, res, next) => {
  const newBook = new Book({
    name: req.body.name,
    description: req.body.description,
    published_on: req.body.published_on,
    isbn: req.body.isbn
  })

  const book = await newBook.save()
  const result = {
    id: book._id,
    name: book.name
  }

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'Book saved successfully'))
}

exports.getBook = async (req, res, next) => {
  const id = req.params.id
  const book = await Book.findById(id)
  if (!book) {
    const error = new Error('Could not find book.')
    error.statusCode = 404
    throw error
  }

  const result = {
    id: book._id,
    name: book.name,
    description: book.description,
    published_on: book.published_on,
    isbn: book.isbn
  }

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'Book retrieved successfully'))
}

exports.getAllBooks = async (req, res, next) => {
  const books = await Book.find()
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

exports.updateBook = async (req, res, next) => {
  const id = req.params.id

  const preBook = {
    name: req.body.name,
    description: req.body.description,
    published_on: req.body.published_on,
    isbn: req.body.isbn
  }

  const book = await Book.findByIdAndUpdate(id, preBook)
  if (!book) {
    const error = new Error('Could not find book.')
    error.statusCode = 404
    throw error
  }

  const result = {
    id: book._id,
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
  const book = await Book.findByIdAndRemove(id)
  if (!book) {
    const error = new Error('Could not find book.')
    error.statusCode = 404
    throw error
  }

  return res
    .status(200)
    .json(prepareSuccessResponse({}, 'Book deleted successfully.'))
}
