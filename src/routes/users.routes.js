const express = require('express')
const usersRouter = express.Router()
const usersController = require('../controllers/users.controller.js')
const { verifyToken, verifyUser } = require('../middlewares/auth.js')

usersRouter.get('/', verifyToken, usersController.getAllUsers)

usersRouter.post('/', verifyToken, verifyUser, usersController.createUser)


module.exports = usersRouter