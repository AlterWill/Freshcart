const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Test database connectivity directly in the controller
        try {
            await db.query('SELECT 1');
        } catch (dbErr) {
            console.error('Database connection test failed in Login:', dbErr.message);
            return res.status(500).json({ message: 'Database connection failed', error: dbErr.message });
        }

        const user = await User.findByEmail(email);
        console.log('Login attempt for email:', email, user ? 'User found' : 'User not found');

        if (user && (await bcrypt.compare(password, user.password))) {
            if (!process.env.JWT_SECRET) {
                console.error('JWT_SECRET is missing from environment variables');
                return res.status(500).json({ message: 'Server configuration error: JWT_SECRET missing' });
            }
            
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = loginUser;
