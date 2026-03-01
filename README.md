# SmartMart - Online Grocery Delivery System

A production-ready full-stack web application replicating an Instamart/Blinkit style online supermarket. Built with React, Tailwind CSS, Node.js, Express, and MySQL. Suitable for DBMS academic projects.

## Project Structure
- `/client`: React Frontend (Vite + Tailwind CSS)
- `/server`: Node.js + Express Backend
- `schema.sql`: Complete MySQL database schema and sample data.
- `API_DOCUMENTATION.md`: Detailed REST API endpoints.

## Prerequisites
- Node.js (v16+)
- MySQL Server

## Setup Instructions

### 1. Database Setup
Ensure your MySQL server is running. Create the database and tables using the provided schema.
```bash
mysql -u root -p < schema.sql
```
*Note: This creates a `smartmart` DB and inserts an Admin user and a Test user.*

### 2. Backend Setup
Navigate to the server directory, install dependencies, and start the development server.
```bash
cd server
npm install
```

Configure Environment Variables:
Ensure `server/.env` is set correctly:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smartmart
JWT_SECRET=super_secret_jwt_key_smartmart
```

Start Backend:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the client directory, install dependencies, and start the Vite dev server.
```bash
cd client
npm install
npm run dev
```

### 4. Access the App
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### Provided Test Accounts
- **Admin**: `admin@smartmart.com` (Password: `password`)
- **Customer**: `customer@smartmart.com` (Password: `password`)

## Core Features Demonstrated
1. **Frontend**: Custom Hooks, Context API (Auth & Cart), Tailwind CSS responsive design.
2. **Backend**: Express Router, JWT Auth Middleware, Password Hashing.
3. **Database**: Relational Database Design, SQL Transactions (Order processing + Stock reduction logic), Joins.
