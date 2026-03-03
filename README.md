# 🛒 SmartMart - Online Grocery Delivery System

SmartMart is a production-ready, full-stack web application replicating an Instamart/Blinkit style online supermarket. It features a modern React frontend, a robust Node.js/Express backend, and a relational PostgreSQL database.

## 🚀 Key Features

### 👤 User Module
- **JWT Authentication:** Secure login and registration.
- **Role-Based Access:** Dedicated interfaces for Customers and Admins.
- **Address Management:** Save multiple delivery addresses.

### 📦 Product & Cart
- **Live Search:** Debounced search for instant results.
- **Smart Filters:** Filter by category and sort by price or name (A-Z).
- **Persistent Cart:** Your items stay in your cart even if you refresh or log out.
- **Dynamic Stock:** Real-time stock counts and "Low Stock" alerts.

### 💳 Order Management
- **One-Click Checkout:** Seamless flow from cart to order confirmation.
- **Order History:** Detailed invoice view for all past purchases.
- **Status Tracking:** Real-time updates (Pending → Packed → Out for delivery → Delivered).

### 🛠 Admin Dashboard
- **Business Stats:** Live view of Total Revenue, Order Count, and Inventory size.
- **Inventory Control:** Create new products with direct image links.
- **Fulfillment:** Update order statuses to keep customers informed.

---

## 💻 Tech Stack

- **Frontend:** React 19, Tailwind CSS 4, Lucide Icons, Vite
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Neon.tech for Cloud, Local for Dev)
- **State Management:** React Context API (Auth & Cart)

---

## 🛠 Local Setup Instructions (Arch Linux)

### 1. Prerequisites
Ensure you have Node.js and PostgreSQL installed:
```bash
sudo pacman -S nodejs npm postgresql
```

### 2. Database Setup
Start your PostgreSQL service and initialize it if you haven't:
```bash
sudo systemctl start postgresql
# If first time: sudo -u postgres initdb -D /var/lib/postgres/data
```

Create the database and apply the schema:
```bash
sudo -u postgres psql -c "CREATE DATABASE smartmart;"
sudo -u postgres psql -d smartmart < schema.sql
```

### 3. Backend Setup
Navigate to the server directory, install dependencies, and start the API:
```bash
cd server
npm install
npm run dev
```
*The API will run on `http://localhost:5000`*

### 4. Frontend Setup
Navigate to the client directory, install dependencies, and start Vite:
```bash
cd client
npm install
npm run dev
```
*The site will run on `http://localhost:5173`*

---

## 🔑 Test Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@smartmart.com` | `password` |
| **Customer** | `customer@smartmart.com` | `password` |

---

## 📂 Project Structure

```text
Freshcart/
├── client/           # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI (Product Cards, Navbar)
│   │   ├── context/     # Auth & Cart State
│   │   ├── pages/       # Home, Dashboard, Checkout, etc.
│   │   └── services/    # Axios API configuration
├── server/           # Express Backend
│   ├── config/       # Database connection
│   ├── controllers/  # Logic for each route
│   ├── models/       # PostgreSQL Queries
│   ├── routes/       # API Endpoint definitions
│   └── middleware/   # JWT Auth protection
└── schema.sql        # Database tables & sample data
```

## 📜 Academic Note
This project is designed as a **DBMS Academic Project**. It demonstrates:
- **Normalization:** 3NF compliant database design.
- **ACID Transactions:** Atomic order placement and stock reduction.
- **Relational Integrity:** Foreign keys with Cascade/Restrict rules.
- **Performance:** Optimized indexing on frequently searched columns.
