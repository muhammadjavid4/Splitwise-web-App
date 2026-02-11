const expenseRepo = require("../repositories/expense.repository");
const groupRepo = require("../repositories/group.repository");
const activityService = require("./activity.services");
const notificationService = require("./notification.services");

// exports.createExpense = async ({
//   groupId,
//   amount,
//   description,
//   paidBy,
//   createdBy,
// }) => {
//   if (!groupId || isNaN(groupId)) {
//     throw new Error("Invalid group id");
//   }

//   if (!amount || amount <= 0) {
//     throw new Error("Amount must be greater than 0");
//   }

//   // creator member?
//   const creator = await groupRepo.getMember(groupId, createdBy);
//   if (!creator) {
//     throw new Error("You are not a member of this group");
//   }

//   // paidBy member?
//   const payer = await groupRepo.getMember(groupId, paidBy);
//   if (!payer) {
//     throw new Error("PaidBy user is not in this group");
//   }

//   // all members
//   const members = await groupRepo.getGroupMembers(groupId);
//   if (members.length === 0) {
//     throw new Error("No members in group");
//   }

//   const splitAmount = Number(
//     (amount / members.length).toFixed(2)
//   );

//   // create expense
//   const expenseId = await expenseRepo.createExpense({
//     groupId,
//     amount,
//     description,
//     paidBy,
//   });

//   // create splits
//   for (const m of members) {
//     await expenseRepo.createExpenseSplit({
//       expenseId,
//       userId: m.user_id,
//       shareAmount: splitAmount,
//     });
//   }

//   return {
//     id: expenseId,
//     groupId,
//     amount,
//     splitAmount,
//     members: members.length,
//   };
// };

// exports.createExpense = async ({
//   groupId,
//   amount,
//   description,
//   paidBy,
//   splits,
//   createdBy,
// }) => {
//   if (!groupId || isNaN(groupId)) {
//     throw new Error("Invalid group id");
//   }
//   if (!amount || amount <= 0) {
//     throw new Error("Amount must be greater than 0");
//   }

//   const creator = await groupRepo.getMember(groupId, createdBy);
//   if (!creator) throw new Error("You are not a group member");

//   const payer = await groupRepo.getMember(groupId, paidBy);
//   if (!payer) throw new Error("PaidBy user not in group");

//   let expenseType = "equal";

//   // 1️⃣ create expense FIRST (common)
//   const expenseId = await expenseRepo.createExpense({
//     groupId,
//     amount,
//     description,
//     paidBy,
//     expenseType,
//   });

//   // ================= CUSTOM SPLIT =================
//   if (splits && splits.length > 0) {
//     expenseType = "custom";

//     const totalSplit = splits.reduce(
//       (sum, s) => sum + Number(s.amount),
//       0
//     );

//     if (Number(totalSplit.toFixed(2)) !== Number(amount)) {
//       throw new Error("Split amount total must equal expense amount");
//     }

//     for (const s of splits) {
//       const member = await groupRepo.getMember(groupId, s.userId);
//       if (!member) {
//         throw new Error(`User ${s.userId} not in group`);
//       }

//       await expenseRepo.createExpenseSplit({
//         expenseId,
//         userId: s.userId,
//         shareAmount: s.amount,
//       });
//     }
//   }
//   // ================= EQUAL SPLIT =================
//   else {
//     const members = await groupRepo.getGroupMembers(groupId);
//     if (!members || members.length === 0) {
//       throw new Error("No members in group");
//     }

//     const splitAmount = Number(
//       (amount / members.length).toFixed(2)
//     );

//     for (const m of members) {
//       await expenseRepo.createExpenseSplit({
//         expenseId,
//         userId: m.user_id,
//         shareAmount: splitAmount,
//       });
//     }
//   }

//   // ================= POST ACTIONS (ONLY ONCE) =================

//   // 🔔 Activity log
//   await activityService.logActivity({
//     userId: createdBy,
//     action: "EXPENSE_CREATE",
//     metadata: {
//       groupId,
//       expenseId,
//       amount,
//       description,
//       type: expenseType,
//     },
//   });

//   // 🔔 Notifications
//   const members = await groupRepo.getGroupMembers(groupId);
//   for (const m of members) {
//     if (m.user_id !== createdBy) {
//       await notificationService.notifyUser({
//         userId: m.user_id,
//         message: `New expense "${description}" added in your group`,
//       });
//     }
//   }

//   return {
//     id: expenseId,
//     type: expenseType,
//   };
// };


exports.createExpense = async ({
  groupId,
  amount,
  description,
  paidBy,
  splits,
  createdBy,
}) => {
  if (!groupId || isNaN(groupId)) {
    throw new Error("Invalid group id");
  }
  if (!amount || amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  // creator & payer check
  const creator = await groupRepo.getMember(groupId, createdBy);
  if (!creator) throw new Error("You are not a group member");

  const payer = await groupRepo.getMember(groupId, paidBy);
  if (!payer) throw new Error("PaidBy user not in group");

  let expenseType = "equal";
  let expenseId;

  // ================= CUSTOM SPLIT =================
  if (splits && splits.length > 0) {
    expenseType = "custom";

    const totalSplit = splits.reduce(
      (sum, s) => sum + Number(s.amount),
      0
    );

    if (Number(totalSplit.toFixed(2)) !== Number(amount)) {
      throw new Error("Split amount total must equal expense amount");
    }

    // create expense AFTER deciding type
    expenseId = await expenseRepo.createExpense({
      groupId,
      amount,
      description,
      paidBy,
      expenseType,
    });

    // validate + create splits
    for (const s of splits) {
      const member = await groupRepo.getMember(groupId, s.userId);
      if (!member) {
        throw new Error(`User ${s.userId} not in group`);
      }

      await expenseRepo.createExpenseSplit({
        expenseId,
        userId: s.userId,
        shareAmount: s.amount,
      });
    }
  }
  // ================= EQUAL SPLIT =================
  else {
    const members = await groupRepo.getGroupMembers(groupId);
    if (!members || members.length === 0) {
      throw new Error("No members in group");
    }

    // create expense
    expenseId = await expenseRepo.createExpense({
      groupId,
      amount,
      description,
      paidBy,
      expenseType, // "equal"
    });

    const splitAmount = Number(
      (amount / members.length).toFixed(2)
    );

    for (const m of members) {
      await expenseRepo.createExpenseSplit({
        expenseId,
        userId: m.user_id,
        shareAmount: splitAmount,
      });
    }
  }

  // ================= POST ACTIONS (ONLY ONCE) =================

  // 🔔 Activity log
  await activityService.logActivity({
    userId: createdBy,
    action: "EXPENSE_CREATE",
    metadata: {
      groupId,
      expenseId,
      amount,
      description,
      type: expenseType,
    },
  });

  // 🔔 Notifications
  const members = await groupRepo.getGroupMembers(groupId);
  for (const m of members) {
    if (m.user_id !== createdBy) {
      await notificationService.notifyUser({
        userId: m.user_id,
        message: `New expense "${description}" added in your group`,
      });
    }
  }

  return {
    id: expenseId,
    type: expenseType,
  };
};


exports.getGroupExpenses = async ({ groupId, userId }) => {
  if (!groupId || isNaN(groupId)) {
    throw new Error("Invalid group id");
  }

  // group exist?
  const group = await groupRepo.findById(groupId);
  if (!group) {
    throw new Error("Group not found");
  }

  // user is member?
  const member = await groupRepo.getMember(groupId, userId);
  if (!member) {
    throw new Error("You are not a member of this group");
  }

  return await expenseRepo.getGroupExpenses(groupId);
};

// exports.updateExpense = async ({
//   expenseId,
//   userId,
//   amount,
//   description,
//   splits,
// }) => {
//   const expense = await expenseRepo.findById(expenseId);
//   if (!expense) throw new Error("Expense not found");
//   if (expense.paid_by !== userId) {
//     throw new Error("Only creator can edit expense");
//   }

//   // ❌ settlement exists?
//   const settled = await expenseRepo.hasSettlement(expense.group_id);
//   if (settled) {
//     throw new Error("Cannot edit expense after settlement");
//   }

//   // update expense
//   await expenseRepo.updateExpense(expenseId, { amount, description });

//   // reset splits if provided
//   if (splits && splits.length) {
//     await expenseRepo.deleteSplits(expenseId);
//     for (const s of splits) {
//       await expenseRepo.createExpenseSplit({
//         expenseId,
//         userId: s.userId,
//         shareAmount: s.amount,
//       });
//     }
//   }

//   return { expenseId };
// };

exports.updateExpense = async ({
  expenseId,
  userId,
  amount,
  description,
  splits,
}) => {
  const expense = await expenseRepo.findById(expenseId);
  if (!expense) throw new Error("Expense not found");

  if (expense.paid_by !== userId) {
    throw new Error("Only creator can edit expense");
  }

  // expense-level settlement check
  const hasSettlement = await expenseRepo.hasSettlementForExpense(expenseId);
  if (hasSettlement) {
    throw new Error("Cannot edit expense after settlement");
  }

  // update expense main fields
  await expenseRepo.updateExpense(expenseId, {
    amount,
    description,
  });

  // 🔥 ALWAYS RESET SPLITS
  await expenseRepo.deleteSplits(expenseId);

  // ================= CUSTOM SPLIT =================
  if (splits && splits.length > 0) {
    const totalSplit = splits.reduce(
      (sum, s) => sum + Number(s.amount),
      0
    );

    if (Number(totalSplit.toFixed(2)) !== Number(amount)) {
      throw new Error("Split total must equal expense amount");
    }

    for (const s of splits) {
      await expenseRepo.createExpenseSplit({
        expenseId,
        userId: s.userId,
        shareAmount: s.amount,
      });
    }

    return { expenseId, type: "custom" };
  }

  // ================= EQUAL SPLIT =================
  const members = await groupRepo.getGroupMembers(expense.group_id);
  if (!members || members.length === 0) {
    throw new Error("No members in group");
  }

  const splitAmount = Number(
    (amount / members.length).toFixed(2)
  );

  for (const m of members) {
    await expenseRepo.createExpenseSplit({
      expenseId,
      userId: m.user_id,
      shareAmount: splitAmount,
    });
  }

  await activityService.logActivity({
  userId,
  action: "EXPENSE_EDIT",
  metadata: {
    groupId: expense.group_id,
    expenseId,
    amount,
  },
});

  return {
    expenseId,
    type: "equal",
    splitAmount,
  };
};



exports.deleteExpense = async ({ expenseId, userId }) => {
  const expense = await expenseRepo.findById(expenseId);
  if (!expense) throw new Error("Expense not found");
  if (expense.paid_by !== userId) {
    throw new Error("Only creator can delete expense");
  }

const hasSettlement = await expenseRepo.hasSettlementForExpense(expenseId);
if (hasSettlement) {
  throw new Error("Cannot delete expense after settlement");
}


  await expenseRepo.deleteSplits(expenseId);
  await expenseRepo.deleteExpense(expenseId);
  await activityService.logActivity({
  userId,
  action: "EXPENSE_DELETE",
  metadata: {
    groupId: expense.group_id,
    expenseId,
  },
});

};