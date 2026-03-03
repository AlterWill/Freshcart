const Product = require('../../models/productModel');

const getProducts = async (req, res) => {
    try {
        const { keyword, category, sort, page, limit } = req.query;
        const result = await Product.getAll({ keyword, category, sort, page, limit });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = getProducts;
