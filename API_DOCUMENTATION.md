# SmartMart API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication (`/api/auth`)

### 1. Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `201 Created`
  ```json
  { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "customer", "token": "jwt_token..." }
  ```

### 2. Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK` (Same as register)

### 3. Get User Profile
- **URL**: `/auth/profile`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` (User details)

---

## Products (`/api/products`)

### 1. Get All Products (with filters)
- **URL**: `/products`
- **Method**: `GET`
- **Query Params** (Optional):
  - `keyword=tomato`
  - `category=1`
  - `sort=price_asc` | `price_desc`
- **Response**: `200 OK` (Array of products)

### 2. Get Product By ID
- **URL**: `/products/:id`
- **Method**: `GET`
- **Response**: `200 OK` (Single product object)

### 3. Get Categories
- **URL**: `/products/categories`
- **Method**: `GET`
- **Response**: `200 OK` (Array of categories)

---

## Cart (`/api/cart`)
*Requires `Authorization: Bearer <token>` header.*

### 1. Get Cart
- **URL**: `/cart`
- **Method**: `GET`
- **Response**: `200 OK` (Array of cart items with product details)

### 2. Add to Cart
- **URL**: `/cart`
- **Method**: `POST`
- **Body**: `{ "productId": 1, "quantity": 2 }`
- **Response**: `201 Created`

### 3. Update Cart Item Quantity
- **URL**: `/cart/:itemId`
- **Method**: `PUT`
- **Body**: `{ "quantity": 3 }`
- **Response**: `200 OK`

### 4. Remove from Cart
- **URL**: `/cart/:itemId`
- **Method**: `DELETE`
- **Response**: `200 OK`

---

## Orders (`/api/orders`)
*Requires `Authorization: Bearer <token>` header.*

### 1. Place Order
- **URL**: `/orders/place`
- **Method**: `POST`
- **Description**: Places order from the current cart, reduces stock, clears cart.
- **Response**: `201 Created` `{ "message": "Order placed successfully", "orderId": 1 }`

### 2. Get Order History
- **URL**: `/orders/history`
- **Method**: `GET`
- **Response**: `200 OK` (Array of orders with enclosed items)

---

## Admin (`/api/admin`)
*Requires `Authorization: Bearer <token>` header AND user must have `role = 'admin'`.*

### 1. Get Dashboard Stats
- **URL**: `/admin/dashboard`
- **Method**: `GET`
- **Response**: `200 OK` 
  ```json
  {
    "totalSales": 1500.50,
    "totalOrders": 10,
    "totalProducts": 50,
    "lowStockProducts": [...]
  }
  ```

### 2. Get All Orders
- **URL**: `/admin/orders`
- **Method**: `GET`
- **Response**: `200 OK` (Array of all orders with user details)

### 3. Update Order Status
- **URL**: `/admin/orders/:id/status`
- **Method**: `PUT`
- **Body**: `{ "status": "Delivered" }` (Pending, Packed, Out for delivery, Delivered)
- **Response**: `200 OK`

### 4. Add Product
- **URL**: `/admin/products`
- **Method**: `POST`
- **Body**: `{ "name": "Apple", "price": 100, "stock": 50, "category_id": 1, "description": "...", "image_url": "..." }`
- **Response**: `201 Created`
