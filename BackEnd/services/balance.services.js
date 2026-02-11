const db = require("../config/db");
const groupRepo = require("../repositories/group.repository");

exports.getGroupBalance = async ({ groupId, userId }) => {
  // basic checks
  const member = await groupRepo.getMember(groupId, userId);
  if (!member) {
    throw new Error("You are not a member of this group");
  }

  // ================= YOU OWE =================
  const [youOwe] = await db.query(
  `
  SELECT 
    e.paid_by AS user_id,
    u.name,
    (
      SUM(es.share_amount)
      -
      IFNULL((
        SELECT SUM(s.amount)
        FROM settlements s
        WHERE s.group_id = ?
          AND s.paid_by = ?
          AND s.paid_to = e.paid_by
          AND s.status = 'completed'
      ), 0)
    ) AS amount
  FROM expense_split es
  JOIN expenses e ON e.id = es.expense_id
  JOIN users u ON u.id = e.paid_by
  WHERE es.user_id = ?
    AND e.group_id = ?
    AND e.paid_by != ?
  GROUP BY e.paid_by
  HAVING amount > 0
  `,
  [groupId, userId, userId, groupId, userId]
);


  // ================= YOU GET =================
 const [youGet] = await db.query(
  `
  SELECT 
    es.user_id AS user_id,
    u.name,
    (
      SUM(es.share_amount)
      -
      IFNULL((
        SELECT SUM(s.amount)
        FROM settlements s
        WHERE s.group_id = ?
          AND s.paid_by = es.user_id
          AND s.paid_to = ?
          AND s.status = 'completed'
      ), 0)
    ) AS amount
  FROM expense_split es
  JOIN expenses e ON e.id = es.expense_id
  JOIN users u ON u.id = es.user_id
  WHERE e.paid_by = ?
    AND e.group_id = ?
    AND es.user_id != ?
  GROUP BY es.user_id
  HAVING amount > 0
  `,
  [groupId, userId, userId, groupId, userId]
);

  return {
    groupId: Number(groupId),
    you_owe: youOwe,
    you_get: youGet,
  };
};





// const db = require("../config/db");
// const groupRepo = require("../repositories/group.repository");

// exports.getGroupBalance = async ({ groupId, userId }) => {
//   if (!groupId || isNaN(groupId)) {
//     throw new Error("Invalid group id");
//   }

//   // group exist?
//   const group = await groupRepo.findById(groupId);
//   if (!group) {
//     throw new Error("Group not found");
//   }

//   // user is member?
//   const member = await groupRepo.getMember(groupId, userId);
//   if (!member) {
//     throw new Error("You are not a member of this group");
//   }

//   /**
//    * Logic:
//    * - If YOU paid and others have share → YOU GET
//    * - If someone else paid and YOU have share → YOU OWE
//    */

//   // YOU OWE
//   const [youOweRows] = await db.query(
//     `
//     SELECT 
//       u.id AS user_id,
//       u.name,
//       SUM(es.share_amount) AS amount
//     FROM expense_split es
//     JOIN expenses e ON e.id = es.expense_id
//     JOIN users u ON u.id = e.paid_by
//     WHERE es.user_id = ?
//       AND e.group_id = ?
//       AND e.paid_by != ?
//     GROUP BY e.paid_by
//     `,
//     [userId, groupId, userId]
//   );

//   // YOU GET
//   const [youGetRows] = await db.query(
//     `
//     SELECT 
//       u.id AS user_id,
//       u.name,
//       SUM(es.share_amount) AS amount
//     FROM expense_split es
//     JOIN expenses e ON e.id = es.expense_id
//     JOIN users u ON u.id = es.user_id
//     WHERE e.paid_by = ?
//       AND e.group_id = ?
//       AND es.user_id != ?
//     GROUP BY es.user_id
//     `,
//     [userId, groupId, userId]
//   );

//   return {
//     groupId: Number(groupId),
//     you_owe: youOweRows,
//     you_get: youGetRows,
//   };
// };
