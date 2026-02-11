const db = require("../config/db");

exports.createNotification = async ({ userId, message }) => {
  await db.query(
    `
    INSERT INTO notifications (user_id, message)
    VALUES (?, ?)
    `,
    [userId, message]
  );
};

exports.getUserNotifications = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT id, message, is_read, created_at
    FROM notifications
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );
  return rows;
};

exports.markAsRead = async (notificationId, userId) => {
  await db.query(
    `
    UPDATE notifications
    SET is_read = 1
    WHERE id = ? AND user_id = ?
    `,
    [notificationId, userId]
  );
};

exports.getUnreadCount = async (userId) => {
  const [[row]] = await db.query(
    `
    SELECT COUNT(*) AS count
    FROM notifications
    WHERE user_id = ? AND is_read = 0
    `,
    [userId]
  );

  return row.count;
};
