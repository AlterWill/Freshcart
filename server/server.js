const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow all origins in production for now to fix connection issues
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const addressRoutes = require("./routes/addressRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const healthRoutes = require("./routes/healthRoutes");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/health", healthRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to SmartMart API" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error', 
    error: err.message,
    path: req.path
  });
});

// Start Server (only if not loaded as a module by Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
