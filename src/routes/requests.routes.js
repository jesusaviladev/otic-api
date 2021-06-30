const express = require('express')
const requestsRouter = express.Router()
const requestsController = require('../controllers/requests.controller.js')
const { validateRequest, validateEditRequest } = require('../middlewares/validate.js')
const { verifyToken, verifyUser } = require('../middlewares/auth.js')

requestsRouter.get('/', verifyToken, requestsController.getAllRequests)

requestsRouter.get('/search', requestsController.searchRequests)

requestsRouter.post('/', verifyToken, validateRequest, requestsController.createNewRequest)

requestsRouter.put('/:id', verifyToken, validateEditRequest, requestsController.editRequest)

requestsRouter.put('/assign/:id', verifyToken, verifyUser, requestsController.assignRequest)

requestsRouter.delete('/:id', verifyToken, verifyUser, requestsController.deleteRequest)



module.exports = requestsRouter