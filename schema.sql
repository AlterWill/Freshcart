-- Create ENUM types for PostgreSQL
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('Pending', 'Packed', 'Out for delivery', 'Delivered');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category_id INT NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- Indexes for products
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Cart Items table
CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT unique_cart_product UNIQUE (cart_id, product_id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status order_status DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Indexes for orders
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Order Items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Insert Sample Data using ON CONFLICT for PostgreSQL
INSERT INTO users (id, name, email, password, role) VALUES 
(1, 'Admin User', 'admin@smartmart.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
(2, 'Test Customer', 'customer@smartmart.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for users
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

INSERT INTO categories (id, name) VALUES 
(1, 'Fruits & Vegetables'),
(2, 'Dairy & Breakfast'),
(3, 'Snacks & Munchies'),
(4, 'Cold Drinks & Juices')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for categories
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));

INSERT INTO products (id, name, price, stock, category_id, description, image_url) VALUES 
(1, 'Fresh Tomatoes', 40.00, 100, 1, 'Freshly picked red tomatoes.', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800'),
(2, 'Onions', 30.00, 150, 1, 'Farm fresh regular onions.', 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=800'),
(3, 'Amul Taaza Milk', 27.00, 50, 2, 'Toned milk, pasteurized.', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800'),
(4, 'FarmLite Bread', 45.00, 30, 2, 'Whole wheat brown bread.', 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&q=80&w=800'),
(5, 'Lays Classic Salted', 20.00, 200, 3, 'Potato chips classic salted flavor.', 'https://images.unsplash.com/photo-1566478989037-eade3f7243e8?auto=format&fit=crop&q=60&w=800'),
(6, 'Coca Cola 1L', 60.00, 100, 4, 'Refreshing Cola drink.', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=60&w=800'),
(7, 'Organic Bananas', 60.00, 80, 1, 'Bunch of 6 ripe organic bananas.', 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=60&w=800'),
(8, 'Greek Yogurt', 120.00, 40, 2, 'High protein plain greek yogurt.', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=60&w=800'),
(9, 'Doritos Nacho Cheese', 35.00, 120, 3, 'Crunchy nacho cheese flavored chips.', 'https://images.unsplash.com/photo-1599490659223-9150c4468d62?auto=format&fit=crop&q=60&w=800'),
(10, 'Orange Juice 1L', 95.00, 60, 4, '100% pure squeezed orange juice.', 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=60&w=800'),
(11, 'Red Apples', 180.00, 50, 1, 'Sweet and crunchy Washington apples (1kg).', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?auto=format&fit=crop&q=60&w=800'),
(12, 'Cheddar Cheese', 250.00, 25, 2, 'Aged sharp cheddar cheese block.', 'https://images.unsplash.com/photo-1618067424218-90f9b1248a4c?auto=format&fit=crop&q=60&w=800'),
(13, 'Penne Pasta 500g', 85.00, 100, 3, 'Durum wheat semolina pasta.', 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=60&w=800'),
(14, 'Nescafe Classic 100g', 320.00, 40, 4, 'Pure instant coffee.', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=60&w=800'),
(15, 'Free Range Eggs 12pk', 140.00, 30, 2, 'Farm fresh large brown eggs.', 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=60&w=800'),
(16, 'Ferrero Rocher 16pk', 550.00, 20, 3, 'Crispy hazelnut milk chocolates.', 'https://images.unsplash.com/photo-1549007994-cb92ca067b0f?auto=format&fit=crop&q=60&w=800'),
(17, 'Avocado 2pk', 199.00, 15, 1, 'Ready to eat hass avocados.', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=800'),
(18, 'Sparkling Water 500ml', 45.00, 200, 4, 'Carbonated natural mineral water.', 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=800')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    stock = EXCLUDED.stock,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url;

-- Reset sequence for products
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
