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

## 🛠 Setup Instructions

For **complete detailed setup** with troubleshooting, see [SETUP.md](./SETUP.md)

### Quick Start (Local Development)

#### Prerequisites
- Node.js (v14+) and npm/pnpm
- PostgreSQL installed and running

#### 1. Database Setup
```bash
# Create database
sudo -u postgres createdb smartmart

# Load schema
sudo -u postgres psql -d smartmart < schema.sql
```

#### 2. Configure Environment
Create `.env` in the project root:
```bash
DB_HOST=localhost
DB_USER=postgres
DB_NAME=smartmart
DB_PORT=5432
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

#### 3. Backend Setup
```bash
cd server
npm install
npm run dev  # Runs on http://localhost:5000
```

#### 4. Frontend Setup
```bash
cd client
npm install
npm run dev  # Runs on http://localhost:5173
```

#### 5. Verify Setup
```bash
# Test API health
curl http://localhost:5000/api/health
```

### Production Deployment

For **Vercel + Neon.tech** deployment, see [SETUP.md - Production Deployment Setup](./SETUP.md#production-deployment-setup)

**Quick summary:**
1. Create Neon.tech account and database
2. Add `POSTGRES_URL` to Vercel environment variables
3. Load schema into Neon database
4. Deploy to Vercel

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
