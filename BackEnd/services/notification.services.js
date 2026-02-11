const notificationRepo = require("../repositories/notification.repository");

exports.notifyUser = async ({ userId, message }) => {
  await notificationRepo.createNotification({ userId, message });
};

exports.getMyNotifications = async (userId) => {
  return await notificationRepo.getUserNotifications(userId);
};

exports.readNotification = async ({ notificationId, userId }) => {
  await notificationRepo.markAsRead(notificationId, userId);
};

exports.getUnreadCount = async (userId) => {
  return await notificationRepo.getUnreadCount(userId);
};

