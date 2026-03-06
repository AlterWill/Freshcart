const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        const userExists = await User.findByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userId = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'customer'
        });

        res.status(201).json({
            id: userId,
            name,
            email,
            role: 'customer',
            token: generateToken(userId, 'customer'),
        });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = registerUser;
