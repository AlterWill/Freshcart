const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');

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

        // Test database connectivity
        try {
            await db.query('SELECT 1');
        } catch (dbErr) {
            console.error('Database connection test failed in Register:', dbErr.message);
            return res.status(500).json({ message: 'Database connection failed', error: dbErr.message });
        }

        const userExists = await User.findByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userIdRaw = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'customer'
        });
        
        // Ensure ID is a valid number/string for JWT
        const userId = userIdRaw?.id || userIdRaw;

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is missing from environment variables');
            return res.status(500).json({ message: 'Server configuration error: JWT_SECRET missing' });
        }

        const token = generateToken(userId, 'customer');
        console.log('JWT Token generated for new user ID:', userId);

        res.status(201).json({
            id: userId,
            name,
            email,
            role: 'customer',
            token: token,
        });
    } catch (error) {
        console.error('Final Catch - Register Error:', error.stack);
        res.status(500).json({ 
            message: 'Registration process failed', 
            error: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        });
    }
};

module.exports = registerUser;
