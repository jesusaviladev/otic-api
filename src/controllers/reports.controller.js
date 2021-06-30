const Report = require('../models/report.model.js')
const Request = require('../models/request.model.js')
const User = require('../models/user.model.js')

const reportsController = {}

reportsController.getReports = (request, response, next) => {
	Report.find({})
		.then(reports => response.json(reports))
		.catch(error => next(error))
}

reportsController.createReport = async (request, response, next) => {

	const { title, comment, succesful, requestId, userId } = request.body

	try {

		const requestInBD = await Request.findById(requestId)

		const userInBD = await User.findById(userId)

		const newReport = new Report({
			title: title,
			comment: comment,
			succesful: succesful,
			requestId: requestInBD._id,
			userId: userInBD._id
		})

		const savedReport = await newReport.save()

		userInBD.reports.concat(savedReport._id)

		requestInBD.status = 'Fulfilled'

		await userInBD.save()

		await requestInBD.save()

		response.status(201).json(savedReport)
	}

	catch (error){
		next(error)
	}
}

reportsController.editReport = (request, response, next) => {
	response.json({
		msg: 'edit reports'
	})
}

reportsController.deleteReport = (request, response, next) => {
	response.json({
		msg: 'delete reports'
	})
}

module.exports = reportsController