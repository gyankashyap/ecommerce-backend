const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    const { name, category, description, price, discount } = req.body;
    const sellerId = req.user.id;
    try {
        const product = await Product.create(sellerId, name, category, description, price, discount);
        res.status(201).json({ message: 'Product added', product });
    } catch (error) {
        res.status(400).json({ error: 'Error adding product' });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const sellerId = req.user.id;
    try {
        const product = await Product.update(id, sellerId, req.body);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product updated', product });
    } catch (error) {
        res.status(400).json({ error: 'Error updating product' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const sellerId = req.user.id;
    try {
        await Product.delete(id, sellerId);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting product' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: 'Error getting products' });
    }

};