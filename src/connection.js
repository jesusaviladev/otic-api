const mongoose = require('mongoose')
const { DB_URI } = require('./config.js')
//Conectamos a la base de datos MongoDB
const connectToDatabase = async () => {

	try {

		await mongoose.connect(DB_URI, {
			'useNewUrlParser': true,
			'useUnifiedTopology': true,
			'useFindAndModify': false,
			'useCreateIndex': true
		})	

		console.log('Connected to Database')
	}

	catch (error) {
		console.log('Error: cannot connect to database')
	}

}

connectToDatabase()

process.on('uncaughtException', (error) => {
	console.log(error)
	mongoose.disconnect()
})