const User = require('../models/user.model.js')
const usersController = {}

usersController.getAllUsers = (request, response) => {
	User.find({}).populate('roles')
		.then(users => response.json(users))
		.catch(error => next(error))
}

usersController.createUser = (request, response) => {

	response.json({
		res: 'creating user from admin'
	})
}

usersController.deleteUser = (request, response) => {

	response.json({
		res: 'creating user from admin'
	})
}


module.exports = usersController