const express = require('express')
const reportsRouter = express.Router()
const reportsController = require('../controllers/reports.controller.js')


reportsRouter.get('/', reportsController.getReports)

reportsRouter.post('/', reportsController.createReport)

reportsRouter.put('/:id', reportsController.editReport)

reportsRouter.delete('/:id', reportsController.deleteReport)

module.exports = reportsRouter