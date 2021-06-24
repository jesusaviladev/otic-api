const Role = require('../models/roles.model.js')

const createDefaultRoles = async () => {

	try {
		//creamos roles por defecto al iniciar la aplicacion
		const count = await Role.estimatedDocumentCount()
		//contamos para saber si existen roles agregados
		if(count > 0) return;

		const values = await Promise.all([
			//creamos los roles si no existen
			new Role({ name: 'admin' }).save(),
			new Role({ name: 'user' }).save()
			])

		console.log('Created roles by default', values)
	}

	catch (error){
		console.error(error)
	}
}	

module.exports = { createDefaultRoles }