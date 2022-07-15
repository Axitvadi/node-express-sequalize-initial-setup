// Purpose     : Request Validation
// Description : Validate each POST and PUT request as per mongoose model

const Joi = require('joi')

const userSchema = Joi.object({
  first_name: Joi.string().empty().min(2).max(30).required().trim().messages({
    'string.empty': 'First name must be required.',
    'string.min': 'First name should have a minimum length of 2',
    'any.required': 'First name must be required.'
  }),
  last_name: Joi.string().empty().min(2).max(30).required().trim().messages({
    'string.empty': 'Last name must be required.',
    'string.min': 'Last name must be at least 2 characters',
    'any.required': 'Last name must be required.'
  }),
  email: Joi.string().empty().required().email().trim().messages({
    'string.empty': 'Email must be required.',
    'any.required': 'Email must be required.',
    'string.email': 'Invalid email address.'
  }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .allow(null)
    .allow('')
    .trim()
    .messages({ 'string.pattern.base': 'Phone number must have 10 digits.' })
})

module.exports = userSchema
