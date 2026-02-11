const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: req.user,
  });
});

module.exports = router;
