const mongoose = require('mongoose')
const { Schema } = mongoose

const RequestSchema = new Schema({
	title: String,
	date: Date,
	status: String,
	assignedUser: [{
		ref: 'user',
		type: Schema.Types.ObjectId
	}]

})


const Request = mongoose.model('request', RequestSchema)

module.exports = Request