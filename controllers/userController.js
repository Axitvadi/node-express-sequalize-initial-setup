const db = require('../database/conn')
const { User } = db
const { prepareSuccessResponse } = require('../utils/responseHandler')

exports.getUser = async (req, res) => {
  const id = req.params.id
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } })
  if (!user) {
    const error = new Error('User not found.')
    error.statusCode = 404
    throw error
  }

  const result = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone
  }

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'User retrieved successfully.'))
}

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } })

  const result = users.map((user) => {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone
    }
  })

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'Users retrieved successfully.'))
}

exports.updateUser = async (req, res) => {
  const id = req.params.id

  const preUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone
  }

  const user = await User.update(preUser, { where: { id } })

  if (!user) {
    const error = new Error('Could not find user.')
    error.statusCode = 404
    throw error
  }

  const result = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone
  }

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'User updated successfully.'))
}

exports.deleteUser = async (req, res) => {
  const id = req.params.id
  const user = await User.destroy({ where: { id } })
  if (!user) {
    const error = new Error('Could not find user.')
    error.statusCode = 404
    throw error
  }
  return res
    .status(200)
    .json(prepareSuccessResponse({}, 'User deleted successfully.'))
}
