const express = require('express')
require('dotenv').config()
const connection = require('./connection.js')
const cors = require('cors')
const pkg = require('../package.json')
const { createDefaultRoles } = require('./helpers/initialSetup.js')
const registerRouter = require('./routes/register.routes.js')
const loginRouter = require('./routes/login.routes.js')
const usersRouter = require('./routes/users.routes.js')
const requestsRouter = require('./routes/requests.routes.js')
const reportsRouter = require('./routes/reports.routes.js')

const app = express()

//inicializamos roles por defecto
createDefaultRoles()

//recuperamos informacion del package.json
app.set('pkg', pkg)

app.use(express.json())

app.use(cors())

//devolvemos por defecto datos de la aplicacion al entrar en la URL
app.get('/', (request, response) => {

	response.status(200).json({
		name: app.get('pkg').name,
		version: app.get('pkg').version,
		author: app.get('pkg').author
	})

})

//endpoint para registrar un nuevo usuario
app.use('/register', registerRouter)

//endpoint para autentificar usuario
app.use('/login', loginRouter)

app.use('/users', usersRouter)

app.use('/requests', requestsRouter)

app.use('/reports', reportsRouter)

//manejadores de errores
app.use((request, response, next) => {

	response.status(404).end()
	
})

app.use((error, request, response, next) => {

	console.log(error)

	response.status(500).end()

})


const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`)
})
//exportamos el servidor (para tests)
module.exports = { app } 
