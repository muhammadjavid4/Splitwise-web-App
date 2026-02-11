const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const notificationController = require("../controllers/notification.controller");

router.get("/", authMiddleware, notificationController.getMyNotifications);
router.put("/:id/read", authMiddleware, notificationController.markRead);
router.get("/unread-count", authMiddleware, notificationController.getUnreadCount);

module.exports = router;
