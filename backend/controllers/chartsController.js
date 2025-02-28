import chartModel from "../models/chartModel.js";

// fetch all charts avaliable
const fetchCharts = async (req, res) => {
    try {
        const charts = await chartModel.find({});
        res.json({ success: true, charts });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { fetchCharts };