const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 🔥 Proper connection check (promise style)
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ MySQL connected");
    connection.release();
  } catch (err) {
    console.error("❌ Error connecting to DB:", err.message);
  }
})();

module.exports = db;
