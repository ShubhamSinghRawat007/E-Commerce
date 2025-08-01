import { v2 as cloudinary } from "cloudinary"
import { json } from "express"
import productModel from "../models/productModel.js"
import productlogsModel from "../models/productlogsModel.js"

//Add product
const addProduct = async (req,res)=>{
    try {
        const {name,description,price,category,subCategory,sizes,bestseller} = req.body
        
        

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item!==undefined)
        
        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller: bestseller ==='true'? true : false,
            size: JSON.parse(sizes),
            image: imagesUrl,
            date:Date.now()
        }
        const product = new productModel(productData)
        await product.save()
        
        const productaddlogs = new productlogsModel({
            productId:product._id,
            date:Date.now()
        })
        await productaddlogs.save()
       
        res.json({success:true,message:"product added"})
        
        
    } catch (error) {
        res.json({success:false,message:error.message})

    }
}

//List produce
const listProduct = async (req,res)=>{
    try {
        const products =await productModel.find({})
        res.json({success:true,products})
    } catch (error) {
        res.json({success:false,products})
    }
}

//remove product
const removeProduct = async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product removed"})
    } catch (error) {
        res.json({success:false,products})
    }
}

//single product info
const singleProduct = async (req,res)=>{
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        res.json({success:false,products})
    }

}


export {listProduct,addProduct,removeProduct,singleProduct}