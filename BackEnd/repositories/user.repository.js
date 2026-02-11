const db = require("../config/db");

// email se user lao
const findByEmail = async (email) => {
  const [rows] = await db.query(
    `SELECT id, name, email, password, auth_provider, profile_pic
     FROM users
     WHERE email = ?`,
    [email]
  );
  return rows[0];
};

// naya user create karo
const createUser = async ({ name, email, password, profile_pic }) => {
  const [result] = await db.query(
    `INSERT INTO users 
     (name, email, password, auth_provider, profile_pic)
     VALUES (?, ?, ?, 'local', ?)`,
    [name, email, password, profile_pic]
  );

  return result.insertId;
};

module.exports = {
  findByEmail,
  createUser,
};
