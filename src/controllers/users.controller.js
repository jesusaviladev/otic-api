
const usersController = {}

usersController.getAllUsers = (request, response) => {
	response.json({
		res: 'get all users'
	})
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