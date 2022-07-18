module.exports = (connection, DataTypes) => {
  const bookSchema = {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    published_on: {
      type: DataTypes.STRING
    },
    isbn: {
      type: DataTypes.STRING
    }
  }

  const book = connection.define('Book', bookSchema)

  return book
}

// bookSchema.pre('save', async function (next, done) {
//   const errorsMsg = {
//     isbn: 'The isbn has already been taken.',
//     name: 'The name has already been taken.'
//   }
//   try {
//     const isbnExists = await mongoose.models.Book.findOne({
//       isbn: this.isbn
//     })
//     if (isbnExists) {
//       if (isbnExists._id !== this._id) {
//         const error = new Error(errorsMsg.isbn)
//         error.statusCode = 422
//         throw error
//       }
//     }
//     const nameExists = await mongoose.models.Book.findOne({
//       name: this.name
//     })
//     if (nameExists) {
//       if (nameExists._id !== this._id) {
//         const error = new Error(errorsMsg.name)
//         error.statusCode = 422
//         throw error
//       }
//     }
//     next()
//   } catch (error) {
//     return next(error)
//   }
// })
