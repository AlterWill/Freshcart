const Address = require('../models/addressModel');

const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.findByUserId(req.user.id);
        res.json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

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

const removeAddress = async (req, res) => {
    try {
        const affected = await Address.delete(req.params.id, req.user.id);
        if (affected > 0) {
            res.json({ message: 'Address removed' });
        } else {
            res.status(404).json({ message: 'Address not found or unauthorized' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getAddresses, addAddress, removeAddress };
