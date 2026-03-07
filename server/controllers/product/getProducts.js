const Product = require('../../models/productModel');

const getProducts = async (req, res) => {
    try {
        const { keyword, category, sort, page, limit } = req.query;
        const result = await Product.getAll({ keyword, category, sort, page, limit });
        res.json(result);
    } catch (error) {
        console.error("GetProducts Error:", error);
        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack 
        });
    }
};

module.exports = getProducts;
