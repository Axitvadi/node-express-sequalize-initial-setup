//* Include joi to check error type
// const Joi = require('joi')
//* Include all validators
const Validators = require('./validation')

module.exports = function (validator) {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator is not exist`)
  }

  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body)
      req.body = validated
      next()
    } catch (error) {
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (error.isJoi) {
        error.statusCode = 422
        next(error)
      }
    }
  }
}
