const pool = require('../config/db');

class Cart {
    static async addToCart(userId, productId) {
        const result = await pool.query(
            'INSERT INTO carts (user_id, product_id) VALUES ($1, $2) RETURNING *',
            [userId, productId]
        );
        return result.rows[0];
    }

    static async removeFromCart(userId, productId) {
        await pool.query('DELETE FROM carts WHERE user_id = $1 AND product_id = $2', [userId, productId]);
    }

    static async getCart(userId) {
        const result = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
        return result.rows;
    }
}

module.exports = Cart;