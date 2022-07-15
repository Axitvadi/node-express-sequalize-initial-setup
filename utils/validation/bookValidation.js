// Purpose     : Request Validation
// Description : Validate each POST and PUT request as per mongoose model

const Joi = require('joi')

const bookSchema = Joi.object({
  name: Joi.string().empty().min(2).trim().required().messages({
    'string.empty': 'Book name title must be required.',
    'any.required': 'Book name title  must be required.',
    'string.min': 'Book name title should have a minimum length of 2'
  }),
  description: Joi.string().allow(null).allow('').trim(),
  published_on: Joi.string().allow(null).allow('').trim(),
  isbn: Joi.string().empty().max(13).trim().required().messages({
    'string.empty': 'Book ISBN No. must be required.',
    'any.required': 'Book ISBN No. must be required.',
    'string.max': 'The isbn may not be greater than 13 characters.'
  })
})

module.exports = bookSchema
