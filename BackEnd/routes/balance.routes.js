const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const balanceController = require("../controllers/balance.controller");

router.get("/group/:groupId", auth, balanceController.getGroupBalance);

module.exports = router;
