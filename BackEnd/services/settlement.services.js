const groupRepo = require("../repositories/group.repository");
const settlementRepo = require("../repositories/settlement.repository");
const activityService = require("./activity.services");
const notificationService = require("./notification.services");


exports.settleUp = async ({
  groupId,
  paidBy,
  paidTo,
  amount,
  method = "cash",
  createdBy,
}) => {
  if (!method) {
    throw new Error("Payment method is required");
  }
  if (!groupId || isNaN(groupId)) {
    throw new Error("Invalid group id");
  }
  if (!paidTo || paidBy === paidTo) {
    throw new Error("Invalid settlement users");
  }
  if (!amount || amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  // both must be members
  const payer = await groupRepo.getMember(groupId, paidBy);
  if (!payer) throw new Error("You are not a member of this group");

  const receiver = await groupRepo.getMember(groupId, paidTo);
  if (!receiver) throw new Error("Receiver is not a member of this group");

  // create settlement
  const settlementId = await settlementRepo.createSettlement({
    groupId,
    paidBy,
    paidTo,
    amount,
    method,
    status: "completed",
    createdBy,
  });

  await activityService.logActivity({
  userId: paidBy,
  action: "SETTLEMENT",
  metadata: {
    groupId,
    paidTo,
    amount,
    method,
  },
});

await notificationService.notifyUser({
  userId: paidTo,
  message: `You received ₹${amount} via ${method}`,
});



  return {
    id: settlementId,
    groupId,
    paidBy,
    paidTo,
    amount,
    method,
    status: "completed",
  };
};


exports.getGroupHistory = async ({ groupId, userId }) => {
  const member = await groupRepo.getMember(groupId, userId);
  if (!member) throw new Error("Not a group member");

  return await settlementRepo.getGroupHistory(groupId);
};

exports.getMyHistory = async (userId) => {
  return await settlementRepo.getUserHistory(userId);
};


exports.undoSettlement = async ({ id, userId }) => {
  // 1️⃣ Get settlement
  const settlement = await settlementRepo.getById(id);

  if (!settlement || settlement.status !== "completed") {
    throw new Error("Invalid or already reversed settlement");
  }

  // 2️⃣ Check group membership
  const member = await groupRepo.getMember(
    settlement.group_id,
    userId
  );

  if (!member) {
    throw new Error("Not a group member");
  }

  // 3️⃣ Permission: creator OR admin
  if (
    settlement.created_by !== userId &&
    member.role !== "admin"
  ) {
    throw new Error("Not allowed to undo this settlement");
  }

  // 4️⃣ Reverse settlement
  await settlementRepo.updateStatus(id, "reversed");

  // 5️⃣ Activity log
  await activityService.logActivity({
    userId,
    action: "UNDO_SETTLEMENT",
    metadata: {
      settlementId: id,
      amount: settlement.amount,
    },
  });

  // 6️⃣ Notify receiver
  await notificationService.notifyUser({
    userId: settlement.paid_to,
    message: `Settlement of ₹${settlement.amount} was reversed`,
  });
};

// services/settlement.services.js

exports.updateMethod = async ({ id, userId, method }) => {
  const settlement = await settlementRepo.getById(id);

  if (!settlement || settlement.status !== "completed") {
    throw new Error("Invalid settlement");
  }

  const member = await groupRepo.getMember(
    settlement.group_id,
    userId
  );

  if (!member) {
    throw new Error("Not a group member");
  }

  // ✅ only creator OR admin
  if (
    settlement.created_by !== userId &&
    member.role !== "admin"
  ) {
    throw new Error("Not allowed");
  }

  await settlementRepo.updateMethod(id, method);
};

