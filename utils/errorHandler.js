const responseHelper = require('./responseHandler')

const errorHandler = (error, req, res, next) => {
  // console.log(error);
  const status = error.statusCode || 500
  const message = error.message
  return res.status(status).json(responseHelper.prepareErrorResponse(message))
}

module.exports = { errorHandler }
