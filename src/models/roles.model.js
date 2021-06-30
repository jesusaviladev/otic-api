const mongoose = require('mongoose')
const { Schema } = mongoose
//Modelo para los roles de usuario
const roleSchema = new Schema({
	name: String
})


roleSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Role = mongoose.model('role', roleSchema)

module.exports = Role