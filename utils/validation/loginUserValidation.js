// Purpose     : Request Validation
// Description : Validate each POST and PUT request as per mongoose model

const Joi = require('joi')

const loginUserSchema = Joi.object({
  email: Joi.string().empty().required().email().trim().messages({
    'string.empty': 'Email must be required.',
    'any.required': 'Email must be required.',
    'string.email': 'Invalid email address.'
  }),
  password: Joi.string().empty().min(6).required().trim().messages({
    'string.empty': 'Password must be required.',
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password must be required.'
  })
})

module.exports = loginUserSchema
