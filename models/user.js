module.exports = (connection, DataTypes) => {
  const userSchema = {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.BIGINT
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  }
  const user = connection.define('user', userSchema)

  return user
}

// userSchema.pre('save', async function (next) {
//   try {
//     const emailExists = await mongoose.models.User.findOne({
//       email: this.email
//     })
//     if (emailExists) {
//       if (emailExists._id.toString() !== this._id.toString()) {
//         const error = new Error('User already registered with this email')
//         error.statusCode = 422
//         throw error
//       }
//     }
//     next()
//   } catch (error) {
//     return next(error)
//   }
// })
