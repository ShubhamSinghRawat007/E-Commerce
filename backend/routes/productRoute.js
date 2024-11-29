import express from 'express'
import { listProduct,addProduct,removeProduct,singleProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const produtRouter = express.Router()

produtRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)

produtRouter.post('/remove',adminAuth,removeProduct)
produtRouter.post('/single',singleProduct)
produtRouter.get('/list',listProduct)

export default produtRouter