const mongoose = require('mongoose')
const { Schema } = mongoose
//modelo para los usuarios
const userSchema = new Schema({
	username: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	roles: [{ //relacionamos roles con el modelo de Roles
		ref: "role",
		type: Schema.Types.ObjectId
	}],
	requests: [{
		ref: "request",
		type: Schema.Types.ObjectId
	}]
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
	}
})

const User = mongoose.model('user', userSchema)

module.exports = User

