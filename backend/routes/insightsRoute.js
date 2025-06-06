import express from 'express'
import { fetchInsights } from '../controllers/insightsController.js'
import adminAuth from '../middleware/adminAuth.js'

const insightsRouter = express.Router()


//admin features
insightsRouter.get('/all',adminAuth,fetchInsights)

export default insightsRouter