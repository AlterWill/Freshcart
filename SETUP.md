# Freshcart Database Setup Guide

This guide covers setting up the Freshcart application for both local development and production deployment.

## Prerequisites

- **Node.js** (v14+) and **npm/pnpm**
- **PostgreSQL** (local development) or **Neon.tech account** (production)

---

## Local Development Setup

### 1. Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

**macOS (using Homebrew):**
```bash
brew install postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Start PostgreSQL Service

**Ubuntu/Debian/macOS:**
```bash
sudo systemctl start postgresql
# Verify it's running
sudo systemctl status postgresql
```

**Windows:**
PostgreSQL should start automatically after installation. Check Services in Control Panel.

### 3. Create the Database and Initialize Schema

```bash
# Create the 'smartmart' database
sudo -u postgres createdb smartmart

# Load the schema
sudo -u postgres psql -d smartmart < schema.sql

# Verify the schema loaded successfully
sudo -u postgres psql -d smartmart -c "\dt"  # Should list tables
```

### 4. Configure Environment Variables

Create a `.env` file in the project root (already provided as `.env.example`):

```bash
# Local Development Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=
DB_NAME=smartmart
DB_PORT=5432

# Server Configuration
NODE_ENV=development
CLIENT_URL=http://localhost:5173
PORT=5000
```

**Note:** Adjust `DB_PASSWORD` if you set a password during PostgreSQL installation.

### 5. Install Dependencies and Run

```bash
# Install server dependencies
cd server
npm install  # or pnpm install

# Start development server
npm run dev  # or pnpm dev
```

The server should now be running on `http://localhost:5000`

**Expected output:**
```
Using local database connection
Server running on port 5000
```

---

## Production Deployment Setup

Freshcart is configured for deployment on **Vercel** with **Neon.tech** serverless PostgreSQL.

### 1. Create a Neon.tech Account

1. Go to [https://neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Note your database credentials

### 2. Get Your Connection String

In the Neon dashboard:
1. Go to **Connection String** tab
2. Select **PostgreSQL** driver
3. Copy the full connection string (format: `postgresql://user:password@host/dbname`)

### 3. Initialize Database Schema

Before deploying, initialize your Neon database with the schema:

```bash
# Set the connection string temporarily
export POSTGRES_URL="postgresql://user:password@host/dbname"

# Load the schema
psql "$POSTGRES_URL" < schema.sql

# Or if psql is not available, use the Neon SQL Editor in the dashboard
# and copy-paste the contents of schema.sql
```

### 4. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**Option B: GitHub Integration**
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variable in Vercel dashboard

### 5. Add Environment Variables to Vercel

In your Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add the following:

| Key | Value |
|-----|-------|
| `POSTGRES_URL` | Your Neon connection string |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | Your deployed frontend URL |

**Save and redeploy** for changes to take effect.

---

## Troubleshooting

### Local Development Issues

**Error: "ECONNREFUSED 127.0.0.1:5432"**
```
Solution:
1. Verify PostgreSQL is running: sudo systemctl status postgresql
2. Start if not running: sudo systemctl start postgresql
3. Check DB_HOST and DB_PORT in .env match your setup
```

**Error: "database 'smartmart' does not exist"**
```
Solution:
1. Create the database: sudo -u postgres createdb smartmart
2. Load the schema: sudo -u postgres psql -d smartmart < schema.sql
```

**Error: "FATAL: Ident authentication failed for user 'postgres'"**
```
Solution:
1. Check your DB_PASSWORD in .env
2. If password is required, update .env with the correct password
3. If no password, ensure DB_PASSWORD is empty in .env
```

### Production Issues

**Error: "Invalid Database Connection String"**
```
Solution:
1. Verify POSTGRES_URL is set in Vercel environment variables
2. Test connection string locally: psql <connection_string>
3. Check for typos or special characters in the URL
4. Redeploy after fixing the variable
```

**Error: "Tables don't exist in production"**
```
Solution:
1. Verify schema was loaded into Neon database
2. Run: psql <POSTGRES_URL> < schema.sql
3. Clear browser cache and refresh
4. Check Application tab in browser DevTools for actual API error
```

**Error: "404 on /api/products, /api/categories, etc."**
```
This is usually a different issue than database connection. Check:
1. Verify routes are properly configured in server.js
2. Ensure CORS is properly configured for your domain
3. Check that environment variables are set in Vercel
4. Check browser DevTools → Network tab for actual response
5. Test /api/health endpoint to confirm database connection
6. Redeploy if environment variables were recently changed
```

---

## Verifying Your Setup

### Local Development

Test the API health check:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "mode": "local (PostgreSQL)"
}
```

### Production

Test your deployed API:
```bash
curl https://your-vercel-domain.vercel.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "mode": "remote (Neon)"
}
```

---

## Database Schema Overview

The schema includes:

- **users** - User accounts and authentication
- **categories** - Product categories
- **products** - Product catalog
- **cart** - Shopping cart items
- **orders** - Customer orders
- **order_items** - Order line items
- **addresses** - Delivery addresses
- **admin** - Admin users and permissions

All tables have proper constraints, indexes, and 18 sample products for testing.

---

## Development Tips

### Accessing the Database Directly

**Local:**
```bash
sudo -u postgres psql -d smartmart
```

**Production (Neon):**
```bash
psql <your_connection_string>
```

### Resetting the Database

```bash
# Drop and recreate (local only!)
sudo -u postgres dropdb smartmart
sudo -u postgres createdb smartmart
sudo -u postgres psql -d smartmart < schema.sql
```

### Monitoring Queries

Enable query logging in `server/config/db.js`:
```javascript
// Uncomment the console.log lines to see executed queries
console.log('Executing query:', text);
```

---

## Support

For issues not covered here, check:
- Server logs for error messages
- Browser DevTools → Network tab for API responses
- `/api/health` endpoint for connection status
- PostgreSQL/Neon documentation for database-specific issues
