const mongoose = require('mongoose')
const { Schema } = mongoose

const deviceSchema = new Schema({
	name: String,
	serial: String,
	type: String,
})

const personSchema = new Schema({
	name: String,
	lastName: String,
	ci: String
})

const requestSchema = new Schema({
	title: String,
	date: Date,
	status: String,
	assignedUser: {
		ref: 'user',
		type: Schema.Types.ObjectId,
		default: null
	},
	deviceInfo: {
		type: deviceSchema,
		required: true,
		default: {}
	},
	personInfo: {
		type: personSchema,
		required: true,
		default: {}
	}
})


const Request = mongoose.model('request', requestSchema)

module.exports = Request