const expenseService = require("../services/expense.services");

// exports.createExpense = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { groupId, amount, description, paidBy } = req.body;

//     const expense = await expenseService.createExpense({
//       groupId,
//       amount,
//       description,
//       paidBy,
//       createdBy: userId,
//     });

//     res.status(201).json({
//       message: "Expense created successfully",
//       expense,
//     });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

exports.createExpense = async (req, res) => {

  try {
    const userId = req.user.id;

    const expense = await expenseService.createExpense({
      ...req.body,
      createdBy: userId,
    });

    res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports.createExpense = async (req, res) => {
//   console.log("REQ BODY 👉", req.body);

//   try {
//     const userId = req.user.id;
//     console.log("USER ID 👉", userId);
//     // 🔥 STEP 1: body se fields nikalo
//     let { group_id, description, amount,} = req.body;

//     // 🔥 STEP 2: group_id ko NUMBER banao
//     group_id = Number(group_id);

//     if (!group_id || isNaN(group_id)) {
//       return res.status(400).json({ message: "Invalid group id" });
//     }

//     if (!description || !amount) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     // 🔥 STEP 3: paid_by frontend se mat lo
//     const expense = await expenseService.createExpense({
//   groupId: group_id,   // 🔥 MAIN FIX
//   description,
//   amount,
//   paid_by: userId,
//   createdBy: userId,
// });

//     res.status(201).json({
//       message: "Expense created successfully",
//       expense,
//     });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };



exports.getGroupExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId } = req.params;

    const expenses = await expenseService.getGroupExpenses({
      groupId,
      userId,
    });

    res.json({
      expenses,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { expenseId } = req.params;

    const expense = await expenseService.updateExpense({
      expenseId,
      userId,
      ...req.body,
    });

    res.json({ message: "Expense updated", expense });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { expenseId } = req.params;

    await expenseService.deleteExpense({ expenseId, userId });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
