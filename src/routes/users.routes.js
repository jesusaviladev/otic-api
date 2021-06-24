const express = require('express')
const usersRouter = express.Router()
const usersController = require('../controllers/users.controller.js')
const auth = require('../middlewares/auth.js')

usersRouter.get('/', usersController.getAllUsers)

usersRouter.post('/', [auth.verifyToken, auth.verifyUser], usersController.createUser)


module.exports = usersRouter