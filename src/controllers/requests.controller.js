const Request = require('../models/request.model.js')
const User = require('../models/user.model.js')

const requestsController = {}

requestsController.getAllRequests = (request, response, next) => {
	
	Request.find({}).populate('assignedUser', 'name lastName username')
		.then(requests => {
			response.json(requests)
		})
		.catch(error => {
			next(error)
		})
}

requestsController.getRequestById = (request, response, next) => {

	const { id } = request.params

	if(!id || id.length < 12){
		return response.status(400).json({
			error: 'Invalid id'
		})
	}

	Request.findById(id)
		.then(requests => {
			response.json(requests)
		})
		.catch(error => {
			next(error)
		})

}

requestsController.searchRequests = async (request, response, next) => {

	const values = request.query
	if(values.title){
		values.title = decodeURIComponent(values.title)
		
	}

	try {
		const results = await Request.find(values)

		response.status(200).json(results)
	}

	catch(error) {
		next(error)
	}
}


requestsController.createNewRequest = async (request, response, next) => {

	const { 
		title, 
		deviceInfo,
		personInfo 
	} = request.body

	let { assignedUser } = request.body

	const roles = request.userRoles

	if (roles.includes('user')) assignedUser = null

	const status = (assignedUser) ? 'Pending' : 'Unassigned'

	try{

		const newRequest = new Request({
			title: title,
			date: new Date().toISOString(),
			assignedUser: assignedUser,
			status: status,
			deviceInfo: deviceInfo,
			personInfo: personInfo
		})

		if(assignedUser){

			const user = await User.findById(assignedUser)

			newRequest.assignedUser = user._id

			const savedRequest = await newRequest.save()

			user.requests = user.requests.concat(savedRequest._id)

			const savedUser = await user.save()	

			return response.status(201).json(savedRequest)
		}

		const savedRequest = await newRequest.save()		

		response.status(201).json(savedRequest)

	}

	catch (error) {

		next(error)
	}
}

requestsController.editRequest = async (request, response, next) => {

	const { id } = request.params

	if(!id) return response.status(400).json({ error: 'Missing ID for query' })

	const data = request.body

	try {

		const requestEdit = await Request.findByIdAndUpdate(id, data, {
			new: true
		})
		const result = await requestEdit.save()

		response.status(201).json(result)
	}

	catch (error){
		response.status(400).json({ error: 'Invalid id' })
		next(error)
	}

}

requestsController.assignRequest = async (request, response, next) => {

	const { id } = request.params

	const { assignedUser } = request.body

	if(!id || !assignedUser) return response.status(400).json({ 
		error: 'Missing ID for query' })

	try {

		const requestInBD = await Request.findById(id)

		const userInBD = await User.findById(assignedUser)

		if(requestInBD.assignedUser === null){

			requestInBD.assignedUser = userInBD._id

			requestInBD.status = 'Assigned'

			const savedRequest = await requestInBD.save()

			userInBD.requests = userInBD.requests.concat(savedRequest._id)

			const savedUser = await userInBD.save()

			return response.status(201).json(savedRequest)
		}

		else {
			const oldId = requestInBD.assignedUser

			const oldUser = await User.findById(oldId)

			oldUser.requests = oldUser.requests.filter(item => item != id)

			await oldUser.save()

			requestInBD.assignedUser = userInBD._id

			requestInBD.status = 'Assigned'

			const savedRequest = await requestInBD.save()

			userInBD.requests = userInBD.requests.concat(savedRequest._id)

			const savedUser = await userInBD.save()

			return response.status(201).json(savedRequest)
		}
	}

	catch(error){
		next(error)
	}
}

requestsController.deleteRequest = async (request, response, next) => {

	const { id } = request.params

	if(!id) return response.status(400).json({ error: 'Missing ID for query' })

	try {

		const requestToDelete = await Request.findById(id)

		if(!requestToDelete) return response.status(400).json({ message: 'No item found'})

		if(requestToDelete.assignedUser){

			const userInBD = await User.findById(requestToDelete.assignedUser)

			userInBD.requests = userInBD.requests.filter(item => item != id)

			await userInBD.save()
		}

		const deleted = await requestToDelete.deleteOne({ _id: id })
		
		if(deleted){

			response.status(202).json({
					message: 'Deleted succesfully'
				})
		}

	}

	catch (error){
		response.status(400).json({ error: 'Invalid id' })
		next(error)
	}

} 


module.exports = requestsController