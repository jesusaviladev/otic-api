const User = require('../models/user.model.js')
const Role = require('../models/roles.model.js')
const bcrypt = require('bcrypt')

const registerController = {}

registerController.createUser = async (request, response, next)=> {
	
	//Registrar nuevo usuario
	const { 
		username, 
		password, 
		roles,
		name,
		lastName,
		tel,
		email
	} = request.body

	const allUsers = await User.find({ username: username })
	//Comprobamos si el usuario ya existe
	if(allUsers.length > 0){

		return response.status(400).json({
			error: 'Username already exists'
		})
	}
	//Encriptamos la contraseña
	const hashedPassword = await bcrypt.hash(password, 10)

	//agregamos nuevo usuario y respondemos con el usuario agregado
	const newUser = new User({
		username: username,
		password: hashedPassword,
		name: name,
		lastName: lastName,
		tel: tel,
		email: email
	})
	
	//si nos pasan roles buscamos roles en la BD
	if(roles) {
		const foundRoles = await Role.find({ name: {$in: roles}})

		if(foundRoles.length === 0){
			const role = await Role.findOne({ name: 'user' })
			newUser.roles = [ role._id ]
		}

		else {
			newUser.roles = foundRoles.map(role => role._id)
		}
	}
	else{
		const role = await Role.findOne({ name: 'user' })
		newUser.roles = [ role._id ]
	}

	//guardamos el usuario en la BD
	newUser.save()
		.then(createdUser => {
			response.status(201).json(createdUser)
		})
		.catch(error => {
			next(error)
		})

}

module.exports = registerController