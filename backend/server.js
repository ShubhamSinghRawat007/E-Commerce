import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from 'mongoose'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import produtRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import chartsRouter from './routes/chartsRoute.js'
import insightsRouter from './routes/insightsRoute.js'

//aapp config

const app = express()
const port = process.env.port || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',produtRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/charts',chartsRouter)
app.use('/api/insights',insightsRouter)

app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(port,()=> console.log("server started on port " + port)
)