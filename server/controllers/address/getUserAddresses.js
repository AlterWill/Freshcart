const Address = require('../../models/addressModel');

const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.findByUserId(req.user.id);
        res.json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = getAddresses;
