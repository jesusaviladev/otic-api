const Request = require('../models/request.model.js')
const requestsController = {}

requestsController.getAllRequests = (request, response, next) => {
	
	Request.find({})
		.then(requests => {
			response.json(requests)
		})
		.catch(error => {
			next(error)
		})
}

requestsController.createNewRequest = async (request, response, next) => {

	const { title, status = 'Unassigned', assignedUser = [] } = request.body

	const newRequest = new Request({
		title: title,
		date: new Date().toISOString(),
		status: status,
		assignedUser: assignedUser
	})


	try{
		const savedRequest = await newRequest.save()

		response.status(201).json(savedRequest)
	}

	catch (error) {

		next(error)
	}
}

requestsController.editRequest = (request, response, next) => {
	
}

requestsController.deleteRequest = (request, response, next) => {
	
} 


module.exports = requestsController