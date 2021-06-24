const express = require('express')
const requestsRouter = express.Router()
const requestsController = require('../controllers/requests.controller.js')

requestsRouter.get('/', requestsController.getAllRequests)

requestsRouter.post('/', requestsController.createNewRequest)



module.exports = requestsRouter