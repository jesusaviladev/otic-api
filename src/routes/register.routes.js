const registerRouter = require('express').Router()
const registerController = require('../controllers/register.controller.js')
const { validateUser } = require('../middlewares/validate.js')


registerRouter.post('/', validateUser, registerController.createUser)


module.exports = registerRouter