const express = require('express');
const router = express.Router();
const getAddresses = require('../controllers/address/getUserAddresses');
const addAddress = require('../controllers/address/addAddress');
const removeAddress = require('../controllers/address/removeAddress');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getAddresses)
    .post(protect, addAddress);

router.route('/:id')
    .delete(protect, removeAddress);

module.exports = router;
