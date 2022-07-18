const jwt = require('jsonwebtoken')

module.exports = (expectedRole) => (req, res, next) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) {
    const error = new Error('Not authenticated.')
    error.statusCode = 401
    throw error
  }

  const token = authHeader.split(' ')[1]
  let decodedToken

  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  } catch (error) {
    error.statusCode = 401
    throw error
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated.')
    error.statusCode = 401
    throw error
  }

  const role = decodedToken.role
  const authorised = expectedRole.includes(role)

  if (!authorised) {
    const error = new Error('Not authorised.')
    error.statusCode = 401
    throw error
  }

  req.user = decodedToken
  next()
}
