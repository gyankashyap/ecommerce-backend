# E-Commerce Application API

## Overview
This is a simple e-commerce application REST API built with Node.js, Express.js, and PostgreSQL. It supports user authentication, seller functionalities for managing products, and buyer functionalities for managing a shopping cart.

## Features
- User authentication (sign-up and login)
- Seller functionalities (add, edit, delete products)
- Buyer functionalities (search products, add/remove products to/from cart)

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- bcryptjs (for password hashing)
- jsonwebtoken (for token-based authentication)
- dotenv (for environment variables)
- express-validator (for input validation)

# For testing the API:

- As seller:
{ "username": "seller1", "password": "password" }

- As buyer:
{ "username": "buyer1", "password": "password" }

# Here are the API endpoints:

## User Authentication

- Sign Up:
POST /api/auth/signup
Body: { "username": "seller1", "password": "password", "role": "seller" }

- Login as seller:
POST /api/auth/login
Body: { "username": "seller1", "password": "password" }

- Login as buyer:
POST /api/auth/login
Body: { "username": "buyer1", "password": "password" }

## Seller Operations

- Add Product:
POST /api/products
Headers: { "Authorization": "Bearer <token>" }
Body: { "name": "T-Shirt", "category": "clothes", "description": "A cool t-shirt", "price": 19.99, "discount": 0 }

- Update Product:
PUT /api/products/:id
Headers: { "Authorization": "Bearer <token>" }
Body: { "name": "Updated T-Shirt", "category": "clothes", "description": "An updated cool t-shirt", "price": 14.99, "discount": 10 }

- Delete Product:
DELETE /api/products/:id
Headers: { "Authorization": "Bearer <token>" }

## Buyer Operations

- Get Products:
GET /api/products
Add to Cart:
POST /api/cart
Headers: { "Authorization": "Bearer <token>" }
Body: { "productId": 1 }

- Remove from Cart:
DELETE /api/cart
Headers: { "Authorization": "Bearer <token>" }
Body: { "productId": 1 }
Get Cart:
GET /api/cart
Headers: { "Authorization": "Bearer <token>" }

## Setup Instructions
1. Clone the repository:

git clone https://github.com/gyankashyap/ecommerce-backend.git
cd ecommerce-app

2. Install dependencies:

npm install

3. Set up the PostgreSQL database and create the necessary tables:

- Install PostgreSQL and create a database named ecommerce.
- Create tables for users, products, and carts.

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('buyer', 'seller')) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(5, 2) DEFAULT 0
);

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id)
);

4. Create a .env file in the root directory with the following content:

DB_HOST=your_db_host
DB_USER=your_db_username
DB_PORT=5432
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret

5. Start the server:

node src/app.js

6. Use Postman or similar tools to test the API endpoints.

