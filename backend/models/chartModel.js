import mongoose from "mongoose";

const chartSchema = new mongoose.Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
},{minimize:false})

const chartModel= mongoose.models.charts || mongoose.model('charts',chartSchema)

export default chartModel