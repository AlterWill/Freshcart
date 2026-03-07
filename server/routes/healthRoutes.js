const express = require("express");
const router = express.Router();
const { getHealth } = require("../controllers/health");

/**
 * GET /api/health
 * Check API and database health status
 */
router.get("/", getHealth);

module.exports = router;
