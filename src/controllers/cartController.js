const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;
    try {
        const cartItem = await Cart.addToCart(userId, productId);
        res.status(201).json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        res.status(400).json({ error: 'Error adding to cart' });
    }
};

exports.removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;
    try {
        await Cart.removeFromCart(userId, productId);
        res.json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(400).json({ error: 'Error removing from cart' });
    }
};

exports.getCart = async (req, res) => {
    const userId = req.user.id;
    const cartItems = await Cart.getCart(userId);
    res.json(cartItems);
};