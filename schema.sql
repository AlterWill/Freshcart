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
    image_url TEXT,
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

-- Insert Sample Data for Users
INSERT INTO users (id, name, email, password, role) VALUES 
(1, 'Admin User', 'admin@smartmart.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
(2, 'Test Customer', 'customer@smartmart.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer')
ON CONFLICT (id) DO NOTHING;
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

-- TRUNCATE categories and products to ensure a clean start with fresh mappings
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE categories CASCADE;

-- Categories Mapping:
-- 1: Fruits & Vegetables
-- 2: Dairy, Bread & Eggs
-- 3: Munchies & Snacks
-- 4: Water & Beverages (Renamed from Cold Drinks)
-- 5: Tea, Coffee & Health Drinks
-- 6: Cooking & Pantry Essentials

INSERT INTO categories (id, name) VALUES 
(1, 'Fruits & Vegetables'),
(2, 'Dairy, Bread & Eggs'),
(3, 'Munchies & Snacks'),
(4, 'Water & Beverages'),
(5, 'Tea, Coffee & Health Drinks'),
(6, 'Cooking & Pantry Essentials');
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));

-- Re-insert Products with Fixed Category Mappings
INSERT INTO products (id, name, price, stock, category_id, description, image_url) VALUES 
(1, 'Fresh Tomatoes', 40.00, 100, 1, 'Organic red vine-ripened tomatoes.', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800'),
(2, 'Yellow Onion', 30.00, 150, 1, 'Fresh yellow cooking onions.', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=800'),
(3, 'Whole Milk 1L', 27.00, 50, 2, 'Fresh pasteurized whole milk.', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800'),
(4, 'Sourdough Bread', 45.00, 30, 2, 'Artisan sourdough loaf.', 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=800'),
(5, 'Green Cucumber', 25.00, 120, 1, 'Crunchy and refreshing green cucumbers.', 'https://imgs.search.brave.com/ILelOUFBLFEHmlCqdPfhAIBD4evorfUnMqT-rk-1Hh8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YnVycGVlLmNvbS9t/ZWRpYS9jYXRhbG9n/L3Byb2R1Y3QvNi80/LzY0MjkwZGNhZmJm/NjlmOWVlYjIzMTc0/MzllOGQwOGNmYmU3/YmQwZTM1MWU0MjJl/NjM5OWExOGZlYTg3/NzBkZWEuanBlZz9v/cHRpbWl6ZT1tZWRp/dW0mYmctY29sb3I9/MjU1LDI1NSwyNTUm/Zml0PWJvdW5kcyZo/ZWlnaHQ9Mjg4Jndp/ZHRoPTI4OA'),
(6, 'Coca Cola 1L', 60.00, 100, 4, 'Classic refreshing cola drink.', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'),
(7, 'Organic Bananas', 60.00, 80, 1, 'A bunch of fresh organic bananas.', 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=800'),
(8, 'Greek Yogurt', 120.00, 40, 2, 'Creamy high-protein greek yogurt.', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800'),
(9, 'Fresh Broccoli', 55.00, 70, 1, 'Nutrient-rich green broccoli florets.', 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80&w=800'),
(10, 'Red Strawberries', 150.00, 40, 1, 'Sweet and juicy red strawberries.', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=800'),
(11, 'Roasted Coffee Beans', 450.00, 25, 5, 'Premium dark roast coffee beans.', 'https://imgs.search.brave.com/sXtEjw-Zj_qtmkzemtSPdDjzXP3uf4NH6gK1JqigtOo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly81Lmlt/aW1nLmNvbS9kYXRh/NS9TRUxMRVIvRGVm/YXVsdC8yMDI0LzMv/Mzk5NDA5MjEwL1JX/L0lCL1FHLzY0NTAw/ODk1L3JvYXN0ZWQt/Y29mZmVlLWJlYW4t/NTAweDUwMC5qcGc'),
(12, 'Natural Honey', 280.00, 35, 6, 'Pure organic wildflower honey.', 'https://imgs.search.brave.com/vrB3cTUD4_dUX-Z3FfuLVQsZ9kkDlcqmFTDKNWkX_YA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjgv/MTIzLzYxNy9zbWFs/bC9wb3VyaW5nLWdv/bGRlbi1ob25leS10/ZXh0dXJlLWhlYWx0/aHktYW5kLW5hdHVy/YWwtZGVsaWNpb3Vz/LXN3ZWV0cy1mbG93/LWRyaXBwaW5nLXll/bGxvdy1tZWx0ZWQt/bGlxdWlkLWZvb2Qt/YmFja2dyb3VuZC1w/aG90by5qcGc'),
(13, 'Extra Virgin Olive Oil', 650.00, 20, 6, 'Cold-pressed extra virgin olive oil.', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800'),
(14, 'Penne Pasta 500g', 85.00, 100, 6, 'High quality durum wheat pasta.', 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800'),
(15, 'Free Range Eggs 12pk', 140.00, 30, 2, 'Large organic free-range eggs.', 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=800'),
(16, 'Walnuts 200g', 320.00, 45, 3, 'Shelled premium walnuts.', 'https://imgs.search.brave.com/n8i6qoTeqVjILJ6MuZBuNWU5A2fw5gNwsGEPXS9-euk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by93YWxudXQt/aGFsZi1pc29sYXRl/ZC1udXQtcGVlbC0y/NjBudy0yNDI2MjAx/NDE1LmpwZw'),
(17, 'Hass Avocado 2pk', 199.00, 15, 1, 'Creamy ripe hass avocados.', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=800'),
(18, 'Sparkling Water 500ml', 45.00, 200, 4, 'Pure mountain sparkling water.', 'https://imgs.search.brave.com/-G1H20cN3HCMmBpycksKGDHDFNvQWowTXsq3eR6tNtA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTMv/NjE3LzE5OS9zbWFs/bC9nbGFzcy1vZi1z/cGFya2xpbmctd2F0/ZXItd2l0aC1pY2Ut/Y3ViZXMtYW5kLXZp/c2libGUtY2FyYm9u/YXRpb24tYnViYmxl/cy1vbi1hLXdvb2Rl/bi1zdXJmYWNlLWN1/bGluYXJ5Z3JhcGh5/LXBob3RvLmpwZw');

-- Ensure the ID sequence is correctly set to the highest current ID
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
