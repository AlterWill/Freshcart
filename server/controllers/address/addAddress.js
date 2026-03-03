const Address = require('../../models/addressModel');

const addAddress = async (req, res) => {
    try {
        const { address, city, pincode } = req.body;
        if (!address || !city || !pincode) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
        const insertId = await Address.create(req.user.id, { address, city, pincode });
        res.status(201).json({ id: insertId, address, city, pincode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = addAddress;
