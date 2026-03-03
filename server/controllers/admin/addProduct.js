const Admin = require('../../models/adminModel');

const createProduct = async (req, res) => {
    try {
        const { name, price, stock, category_id, description, image_url } = req.body;
        if (!name || !price || !stock || !category_id) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const insertId = await Admin.addProduct(req.body);
        res.status(201).json({ message: 'Product created', id: insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = createProduct;
