const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/auth/registerUser');
const loginUser = require('../controllers/auth/loginUser');
const getUserProfile = require('../controllers/auth/getUserProfile');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
