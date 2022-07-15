const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: Number },
    role: { type: String, default: 'user' }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  try {
    const emailExists = await mongoose.models.User.findOne({
      email: this.email
    })
    if (emailExists) {
      if (emailExists._id.toString() !== this._id.toString()) {
        const error = new Error('User already registered with this email')
        error.statusCode = 422
        throw error
      }
    }
    next()
  } catch (error) {
    return next(error)
  }
})

module.exports = mongoose.model('User', userSchema)
