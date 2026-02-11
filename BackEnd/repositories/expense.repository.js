const db = require("../config/db");

// exports.createExpense = async ({
//   groupId,
//   amount,
//   description,
//   paidBy,
// }) => {
//   const [result] = await db.query(
//     `
//     INSERT INTO expenses
//     (group_id, paid_by, amount, description, expense_type)
//     VALUES (?, ?, ?, ?, 'equal')
//     `,
//     [groupId, paidBy, amount, description]
//   );

//   return result.insertId;
// };

exports.createExpense = async ({
  groupId,
  amount,
  description,
  paidBy,
  expenseType = "equal",
}) => {
  const [result] = await db.query(
    `
    INSERT INTO expenses
    (group_id, paid_by, amount, description, expense_type)
    VALUES (?, ?, ?, ?, ?)
    `,
    [groupId, paidBy, amount, description, expenseType]
  );

  return result.insertId;
};


exports.createExpenseSplit = async ({
  expenseId,
  userId,
  shareAmount,
}) => {
  await db.query(
    `
    INSERT INTO expense_split
    (expense_id, user_id, share_amount)
    VALUES (?, ?, ?)
    `,
    [expenseId, userId, shareAmount]
  );
};


exports.getGroupExpenses = async (groupId) => {
  const [rows] = await db.query(
    `
    SELECT 
      e.id,
      e.amount,
      e.description,
      e.expense_type,
      e.created_at,
      u.id AS paid_by_id,
      u.name AS paid_by_name
    FROM expenses e
    JOIN users u ON u.id = e.paid_by
    WHERE e.group_id = ?
    ORDER BY e.created_at DESC
    `,
    [groupId]
  );

  return rows;
};


exports.findById = async (expenseId) => {
  const [rows] = await db.query(
    "SELECT * FROM expenses WHERE id = ?",
    [expenseId]
  );
  return rows[0];
};

exports.updateExpense = async (expenseId, { amount, description }) => {
  await db.query(
    "UPDATE expenses SET amount = ?, description = ? WHERE id = ?",
    [amount, description, expenseId]
  );
};

exports.deleteExpense = async (expenseId) => {
  await db.query("DELETE FROM expenses WHERE id = ?", [expenseId]);
};

exports.deleteSplits = async (expenseId) => {
  await db.query("DELETE FROM expense_split WHERE expense_id = ?", [expenseId]);
};

exports.hasSettlementForExpense = async (expenseId) => {
  const [rows] = await db.query(
    `
    SELECT s.id
    FROM settlements s
    JOIN expenses e ON e.group_id = s.group_id
    JOIN expense_split es ON es.expense_id = e.id
    WHERE e.id = ?
      AND s.status = 'completed'
      AND s.created_at >= e.created_at
      AND (
        (s.paid_by = es.user_id AND s.paid_to = e.paid_by)
        OR
        (s.paid_by = e.paid_by AND s.paid_to = es.user_id)
      )
    LIMIT 1
    `,
    [expenseId]
  );

  return rows.length > 0;
};
