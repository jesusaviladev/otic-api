const Joi = require('joi')

const validate = {}

validate.validateUser = (request, response, next) => {

	//validamos datos de la peticion

	const data = request.body

	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required(),
		name: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		tel: Joi.string().required(),
		roles: Joi.array().items(Joi.string().valid('admin', 'user')).required()
	})

	const { error, value } = schema.validate(data, {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true // remove unknown props
	})


	if(error){

		const details = error.details.map(err => err.message).join(', ')

		return response.status(400).json({
			error: 'Missing or wrong data in payload',
			details: details
		})
	}

	else {
		request.body = value
		next()
	}
}

validate.validateRequest = (request, response, next) => {

	const data = request.body

	const schema = Joi.object({
		title: Joi.string().required(),
		assignedUser: Joi.string(),
		deviceInfo: Joi.object({
			name: Joi.string().required(),
			serial: Joi.string().required(),
			type: Joi.string().required()
		}).required(),
		personInfo: Joi.object({
			name: Joi.string().required(),
			lastName: Joi.string().required(),
			ci: Joi.string().required()
		}).required()
	})

	const { error, value } = schema.validate(data, {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true // remove unknown props
	})

	if(error){

		const details = error.details.map(err => err.message).join(', ')

		return response.status(400).json({
			error: 'Missing or wrong data in payload',
			details: details
		})
	}

	else {
		request.body = value
		next()
	}

}

validate.validateEditRequest = (request, response, next) => {

	const data = request.body

	const schema = Joi.object({
		title: Joi.string().empty(''),
		deviceInfo: Joi.object({
			name: Joi.string().empty(''),
			serial: Joi.string().empty(''),
			type: Joi.string().empty('')
		}),
		personInfo: Joi.object({
			name: Joi.string().empty(''),
			lastName: Joi.string().empty(''),
			ci: Joi.string().empty('')
		})
	})

	const { error, value } = schema.validate(data, {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true // remove unknown props
	})

	if(error){

		const details = error.details.map(err => err.message).join(', ')

		return response.status(400).json({
			error: 'Missing or wrong data in payload',
			details: details
		})
	}

	else {
		request.body = value
		next()
	}

}


module.exports = validate