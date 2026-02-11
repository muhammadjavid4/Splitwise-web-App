const activityRepo = require("../repositories/activity.repository");

// 🔹 Log activity
exports.logActivity = async ({ userId, action, metadata }) => {
  await activityRepo.createLog({
    userId,
    action,
    metadata,
  });
};

// 🔹 Get group activities
exports.getGroupActivities = async (groupId) => {
  return await activityRepo.getGroupLogs(groupId);
};

// 🔹 Human-readable formatter
const formatActivityMessage = (activity) => {
  const { action, metadata = {}, user_name } = activity;

  switch (action) {
    case "EXPENSE_CREATE":
      return `${user_name} added "${metadata.description ?? "an expense"}" of ₹${metadata.amount ?? 0}`;

    case "EXPENSE_EDIT":
      return `${user_name} updated an expense to ₹${metadata.amount ?? 0}`;

    case "EXPENSE_DELETE":
      return `${user_name} deleted an expense`;

    case "SETTLEMENT":
      return `${user_name} paid ₹${metadata.amount ?? 0} via ${metadata.method ?? "cash"}`;

    default:
      return `${user_name} performed an action`;
  }
};

// 🔹 Format list before sending to frontend
exports.formatActivities = (activities) => {
  return activities.map((a) => ({
    id: a.id,
    message: formatActivityMessage(a),
    created_at: a.created_at,
  }));
};
