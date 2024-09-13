const pool = require('../config/db');

class Product {
    static async create(sellerId, name, category, description, price, discount) {
        const result = await pool.query(
            'INSERT INTO products (seller_id, name, category, description, price, discount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [sellerId, name, category, description, price, discount]
        );
        return result.rows[0];
    }

    static async update(id, sellerId, data) {
        const result = await pool.query(
            'UPDATE products SET name = $1, category = $2, description = $3, price = $4, discount = $5 WHERE id = $6 AND seller_id = $7 RETURNING *',
            [data.name, data.category, data.description, data.price, data.discount, id, sellerId]
        );
        return result.rows[0];
    }

    static async delete(id, sellerId) {
        await pool.query('DELETE FROM products WHERE id = $1 AND seller_id = $2', [id, sellerId]);
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM products');
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    }
}

module.exports = Product;