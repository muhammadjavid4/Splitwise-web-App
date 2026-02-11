const db = require("../config/db");

// create group
exports.createGroup = async ({ name, createdBy }) => {
  const [result] = await db.query(
    "INSERT INTO user_groups (name, created_by) VALUES (?, ?)",
    [name, createdBy]
  );
  return result.insertId;
};

// check member in group
exports.getMember = async (groupId, userId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM group_members
    WHERE group_id = ? AND user_id = ?
    `,
    [groupId, userId]
  );
  return rows[0];
};

// add member
exports.addMember = async ({ groupId, userId, role }) => {
  await db.query(
    `
    INSERT INTO group_members (group_id, user_id, role)
    VALUES (?, ?, ?)
    `,
    [groupId, userId, role]
  );
};

// remove / leave member (same logic)
exports.removeMember = async (groupId, userId) => {
  await db.query(
    `
    DELETE FROM group_members
    WHERE group_id = ? AND user_id = ?
    `,
    [groupId, userId]
  );
};

// 🔥 MISSING FUNCTION — NOW ADDED
exports.getGroupMembers = async (groupId) => {
  const [rows] = await db.query(
    `
    SELECT user_id
    FROM group_members
    WHERE group_id = ?
    `,
    [groupId]
  );
  return rows;
};

// get my groups
exports.getGroupsByUser = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT 
      g.id,
      g.name,
      g.created_by,
      g.created_at,
      gm.role
    FROM group_members gm
    JOIN user_groups g ON g.id = gm.group_id
    WHERE gm.user_id = ?
    `,
    [userId]
  );
  return rows;
};

// update member role
exports.updateRole = async (groupId, userId, role) => {
  await db.query(
    `
    UPDATE group_members
    SET role = ?
    WHERE group_id = ? AND user_id = ?
    `,
    [role, groupId, userId]
  );
};

// find group by id
exports.findById = async (groupId) => {
  const [rows] = await db.query(
    "SELECT id, created_by FROM user_groups WHERE id = ?",
    [groupId]
  );
  return rows[0];
};

// delete group
exports.deleteGroup = async (groupId) => {
  await db.query(
    "DELETE FROM user_groups WHERE id = ?",
    [groupId]
  );
};


// get all members of a group
exports.getGroupMembers = async (groupId) => {
  const [rows] = await db.query(
    `
    SELECT 
      u.id AS user_id,
      u.name,
      u.email,
      gm.role,
      gm.joined_at
    FROM group_members gm
    JOIN users u ON u.id = gm.user_id
    WHERE gm.group_id = ?
    ORDER BY gm.joined_at ASC
    `,
    [groupId]
  );

  return rows;
};
