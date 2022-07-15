const registerUser = require('./registerUserValidation')
const updateUser = require('./updateUserValidation')
const book = require('./bookValidation') // book api validation
const updateBook = require('./updateBookValidation') // update book api validation
const login = require('./loginUserValidation')

module.exports = {
  registerUser,
  login,
  updateUser,
  book,
  updateBook
}
