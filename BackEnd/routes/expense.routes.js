const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const expenseController = require("../controllers/expense.controller");

router.post("/", authMiddleware, expenseController.createExpense);
router.get("/group/:groupId", authMiddleware, expenseController.getGroupExpenses);
router.put("/:expenseId", authMiddleware, expenseController.updateExpense);
router.delete("/:expenseId", authMiddleware, expenseController.deleteExpense);



module.exports = router;
