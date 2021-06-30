const User = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginController = {}

loginController.login = async (request, response, next)=> {
	
	const { username, password } = request.body

	if(!username || !password){
		return response.status(400).json({
			error: 'Missing data'
		})
	}

	const userDB = await User.findOne({username: username}).populate('roles')

	const isPasswordCorrect = userDB === null 
		? false 
		: await bcrypt.compare(password, userDB.password)

	if(!(userDB && isPasswordCorrect)){
		return response.status(401).json({
			error: 'User or password are invalid'
		})
	}

	else {

		const userToSign = {
			id: userDB.id,
			roles: userDB.roles,
			username: userDB.username
		}

		const token = jwt.sign(userToSign, process.env.SECRET)

		response.status(202).json({
			username: userDB.username,
			token: token
		})
	}
}

module.exports = loginController