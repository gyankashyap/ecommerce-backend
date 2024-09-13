const express = require('express');
const { addProduct, updateProduct, deleteProduct, getProducts } = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, addProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);
router.get('/', getProducts);

module.exports = router;