const Address = require('../../models/addressModel');

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

module.exports = removeAddress;
