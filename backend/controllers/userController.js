import userModel from '../models/userModel.js'
//Route for user login
import validator from 'validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const  loginUser = async (req,res)=>{
     try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User does not exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true, token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }

     } catch (error) {
        res.json({success:false, message:error.message})
     }
}

//Route for user regestration
const registerUser = async (req,res)=>{
    try{
        const {name , email , password} = req.body;

        //checking user already exist or not
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password : hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({success:true,token})

    }catch(error){
        res.json({success:false, message:error.message})
        
    }
}

//Route for Admin login
const adminLogin = async (req,res)=>{
    try {
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS ){
            const payload = {
                email: email,
                password: password
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credential"})
        }
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export {loginUser,registerUser,adminLogin}