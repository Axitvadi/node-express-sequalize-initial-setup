const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { prepareSuccessResponse } = require('../utils/responseHandler')

exports.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('Invalid username or password.')
    error.statusCode = 422
    throw error
  }

  const isEqual = await bcrypt.compare(password, user.password)

  if (!isEqual) {
    const error = new Error('Invalid username or password.')
    error.statusCode = 422
    throw error
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    process.env.SECRET_KEY,
    { expiresIn: '12h' }
  )

  const result = {
    token,
    user: {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
  }

  return res
    .status(200)
    .json(
      prepareSuccessResponse(result, 'Logged in successfully.')
    )
}

exports.register = async (req, res) => {
  const hashedPw = await bcrypt.hash(req.body.password, 10)

  const firstName = req.body.first_name
  const lastName = req.body.last_name
  const email = req.body.email
  const phone = req.body.phone
  const role = 'user'

  const newUser = new User({
    first_name: firstName,
    last_name: lastName,
    password: hashedPw,
    email,
    phone,
    role
  })

  const user = await newUser.save()

  const result = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone
  }

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'User saved successfully.'))
}
