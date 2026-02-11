const db = require("../config/db");

exports.createSettlement = async ({
  groupId,
  paidBy,
  paidTo,
  amount,
  method,
  status,
  createdBy,
}) => {
  const [result] = await db.query(
    `
    INSERT INTO settlements
    (group_id, paid_by, paid_to, amount, method, status, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [groupId, paidBy, paidTo, amount, method, status, createdBy]
  );

  return result.insertId;
};


exports.getGroupHistory = async (groupId) => {
  const [rows] = await db.query(
    `
    SELECT 
      s.id,
      s.amount,
      s.method,
      s.status,
      s.created_at,
      u1.name AS paid_by_name,
      u2.name AS paid_to_name
    FROM settlements s
    JOIN users u1 ON u1.id = s.paid_by
    JOIN users u2 ON u2.id = s.paid_to
    WHERE s.group_id = ?
    ORDER BY s.created_at DESC
    `,
    [groupId]
  );
  return rows;
};

exports.getUserHistory = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT 
      s.id,
      s.group_id,
      s.amount,
      s.method,
      s.status,
      s.created_at,
      u1.name AS paid_by_name,
      u2.name AS paid_to_name
    FROM settlements s
    JOIN users u1 ON u1.id = s.paid_by
    JOIN users u2 ON u2.id = s.paid_to
    WHERE s.paid_by = ? OR s.paid_to = ?
    ORDER BY s.created_at DESC
    `,
    [userId, userId]
  );
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query(
    `SELECT * FROM settlements WHERE id = ?`,
    [id]
  );
  return rows[0];
};

exports.updateStatus = async (id, status) => {
  await db.query(
    `UPDATE settlements SET status = ? WHERE id = ?`,
    [status, id]
  );
};

// repos/settlement.repo.js

exports.updateMethod = async (id, method) => {
  await db.query(
    `UPDATE settlements SET method = ? WHERE id = ?`,
    [method, id]
  );
};
