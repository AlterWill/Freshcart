const { query, connectionMode } = require("../config/db");

/**
 * Health check endpoint - validates database connectivity
 * Returns status and connection information for debugging
 */
const getHealth = async (req, res) => {
  try {
    // Test database connection with a simple query
    const [result] = await query("SELECT NOW() as current_time;");
    
    return res.status(200).json({
      status: "healthy",
      database: "connected",
      mode: connectionMode,
      timestamp: new Date().toISOString(),
      message: "✅ All systems operational"
    });
  } catch (err) {
    console.error("Health check failed:", err.message);
    
    // Provide helpful error details
    let errorDetails = err.message;
    if (err.code === 'ECONNREFUSED') {
      errorDetails = "Cannot connect to database. Check if PostgreSQL is running and credentials are correct.";
    } else if (err.code === '3D000') {
      errorDetails = "Database does not exist. Run: sudo -u postgres createdb smartmart";
    } else if (err.code === '42P01') {
      errorDetails = "Database schema not initialized. Run: sudo -u postgres psql -d smartmart < schema.sql";
    }
    
    return res.status(503).json({
      status: "unhealthy",
      database: "disconnected",
      mode: connectionMode,
      timestamp: new Date().toISOString(),
      error: errorDetails,
      code: err.code,
      message: "❌ Database connection failed"
    });
  }
};

module.exports = {
  getHealth
};
