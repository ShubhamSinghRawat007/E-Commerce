import insightsModel from "../models/insightsModel.js";

// fetch all charts avaliable
const fetchInsights = async (req, res) => {
    try {
        const insights = await insightsModel.find({});
        res.json({ success: true, insights });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { fetchInsights };