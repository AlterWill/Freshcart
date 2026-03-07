const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        process.env.CLIENT_URL,
        "http://localhost:5173",
        "http://localhost:3000",
      ].filter(Boolean);
      if (
        allowedOrigins.length === 0 ||
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== "production"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const addressRoutes = require("./routes/addressRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const healthRoutes = require("./routes/healthRoutes");

// API Routes (must be before static files for priority)
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

// Serve static frontend files in production
const clientDistPath = path.join(__dirname, "../client/dist");
console.log(`[Server] Production mode: ${process.env.NODE_ENV === "production"}`);
console.log(`[Server] Client dist path: ${clientDistPath}`);

if (process.env.NODE_ENV === "production") {
  // Serve static files from client/dist
  app.use(express.static(clientDistPath));
  
  // Handle SPA routing - serve index.html for all non-API routes
  app.get("*", (req, res) => {
    const indexPath = path.join(clientDistPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(`[Server] Error serving index.html:`, err);
        res.status(404).json({ error: "Frontend not found" });
      }
    });
  });
}

// Root endpoint for non-production
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SmartMart API" });
});

// Start Server (only if not loaded as a module by Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
