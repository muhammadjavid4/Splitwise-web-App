const db = require("../config/db");

exports.createLog = async ({ userId, action, metadata }) => {
  await db.query(
    `
    INSERT INTO activity_logs (user_id, action, metadata)
    VALUES (?, ?, ?)
    `,
    [userId, action, JSON.stringify(metadata)]
  );
};

exports.getGroupLogs = async (groupId) => {
  const [rows] = await db.query(
    `
    SELECT 
      a.id,
      a.action,
      a.metadata,
      a.created_at,
      u.name AS user_name
    FROM activity_logs a
    JOIN users u ON u.id = a.user_id
    WHERE JSON_UNQUOTE(JSON_EXTRACT(a.metadata, '$.groupId')) = ?
    ORDER BY a.created_at DESC
    `,
    [String(groupId)]
  );

  return rows;
};
