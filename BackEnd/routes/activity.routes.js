const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const activityController = require("../controllers/activity.controller");

router.get("/group/:groupId", authMiddleware, activityController.getGroupActivities);

module.exports = router;
