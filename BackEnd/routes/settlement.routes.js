const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const settlementController = require("../controllers/settlement.controller");

router.post("/", authMiddleware, settlementController.settleUp);
router.get("/group/:groupId", authMiddleware, settlementController.getGroupHistory);
router.get("/me", authMiddleware, settlementController.getMyHistory);
router.put("/:id/undo", authMiddleware, settlementController.undoSettlement);
// routes/settlement.routes.js
router.put("/:id/method", authMiddleware, settlementController.updateMethod);


module.exports = router;
