import express from 'express'
import { fetchCharts } from '../controllers/chartsController.js'
import adminAuth from '../middleware/adminAuth.js'

const chartsRouter = express.Router()


//admin features
chartsRouter.get('/all',adminAuth,fetchCharts)

export default chartsRouter