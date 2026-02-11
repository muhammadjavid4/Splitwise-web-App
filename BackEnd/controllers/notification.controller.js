const notificationService = require("../services/notification.services");

exports.getMyNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await notificationService.getMyNotifications(userId);
    res.json({ notifications: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.markRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await notificationService.readNotification({
      notificationId: id,
      userId,
    });

    res.json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await notificationService.getUnreadCount(userId);
    res.json({ count });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

