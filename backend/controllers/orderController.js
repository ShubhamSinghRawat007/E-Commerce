import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'


// placing order using cod
const placeOrder = async (req,res)=>{
    try {
        const { userId, items, ammount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            ammount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// stripe
const placeOrderStripe = async (req,res)=>{

}

//razorpay
const placeOrderRazorpay = async (req,res)=>{

}


//all order data for admin pannel
const allOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

//user order fronted
const userOrders = async (req,res)=>{
    try {
        const {userId}= req.body

        const orders = await  orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//update status
const updateStatus = async (req,res)=>{
    try {
        const {orderId,status} = req.body;
        await orderModel.findByIdAndUpdate(orderId,{status})
        
        res.json({success:true, message:'Status Updated'});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}