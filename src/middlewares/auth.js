const jwt = require('jsonwebtoken') 
const User = require('../models/user.model.js')
const Role = require('../models/roles.model.js')
//Middleware para autentificar y autorizar usuarios
const auth = {}
//Metodo para verificar el token del usuario
auth.verifyToken = ( request, response, next ) => {

	const authorization  = request.get('authorization')

	let token = null

	if(authorization  && authorization.toLowerCase().startsWith('bearer')){
		
		token = authorization.slice(7)

	} else {

		return response.status(401).json({

			error: 'Missing or invalid token'
		})
	}

	try {

		const decodedToken = jwt.verify(token, process.env.SECRET)

		if(!token || !decodedToken) return response.status(401).json({
			error: 'Unauthorized'
		})

		else {
			request.userId = decodedToken.id
			request.userRoles = decodedToken.roles.map(roles => roles.name)
			next()
		}

	}

	catch(error){

		response.status(401).json({

			error: 'Unauthorized'
		})

		next(error)
	}

	
}
//Metodo para otorgar permisos de usuario
auth.verifyUser = async (request, response, next) => {

	const { userId } = request

	const user = await User.findById(userId).populate('roles')

	const roles = await Role.find({ _id: { $in: user.roles } }, 'name -_id')

	const userRoles = roles.map(role => role.name)

	if(!userRoles.includes('admin')){

		return response.status(403).json({
			error: 'Admin privilegies required'
		})
	}

	next()
	
}

module.exports = auth