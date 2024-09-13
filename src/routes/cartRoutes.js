const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, addToCart);
router.delete('/', verifyToken, removeFromCart);
router.get('/', verifyToken, getCart);

module.exports = router;