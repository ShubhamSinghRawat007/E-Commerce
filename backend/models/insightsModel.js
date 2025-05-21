import mongoose from "mongoose";

const insightsSchema = new mongoose.Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
},{minimize:false})

const insightsModel= mongoose.models.insights || mongoose.model('insights',insightsSchema)

export default insightsModel