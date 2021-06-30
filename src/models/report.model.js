const mongoose = require('mongoose')
const { Schema } = mongoose

const reportSchema = new Schema({
	title: String,
	date: Date,
	comment: String,
	succesful: Boolean,
	request: {
		ref: 'request',
		type: Schema.Types.ObjectId
	},
	user: {
		ref: 'user',
		type: Schema.Types.ObjectId
	}
})

const Report = mongoose.model('report', reportSchema)

module.exports = Report