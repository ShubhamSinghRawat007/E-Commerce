import userModel from "../models/userModel.js"

// add product to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
       

        // Fetch user data
        const userData = await userModel.findById(userId);

        // Check if user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Initialize cartData if not present
        let cartData = userData.cartData || {};

        // Add item to cart with size
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        // Save updated cartData using $set to optimize the update
        await userModel.findByIdAndUpdate(userId, { $set: { cartData } });

        // Respond with success
        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



//update user cart
const updateCart = async(req,res)=>{
    try {
        const {userId,itemId,size,quantity} = req.body

        const userData = await userModel.findById(userId)

        let cartData = await userData.cartData

        cartData[itemId][size]=quantity

        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message:"Cart Updated"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


//get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Fetch user data from the database
        const userData = await userModel.findById(userId);

        // Check if user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Ensure cartData exists, initialize as an empty object if not
        let cartData = userData.cartData || {};

        // Respond with the user's cart data
        res.json({ success: true, cartData });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export {addToCart,updateCart,getUserCart}