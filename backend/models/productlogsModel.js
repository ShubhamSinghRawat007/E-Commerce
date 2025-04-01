import mongoose from "mongoose";


const productlogsSchema = new mongoose.Schema({
    productId:{type:String, required:true},
    date:{type:Number, required:true}

})
const productlogsModel = mongoose.models.order || mongoose.model("productaddlogs",productlogsSchema);
export default productlogsModel;