const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1️⃣ header check
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. Token missing or invalid format",
      });
    }

    // 2️⃣ token extract
    const token = authHeader.split(" ")[1];

    // 3️⃣ verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ attach user
    req.user = decoded; // { id, email }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
