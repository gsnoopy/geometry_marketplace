const db = require('../../database');

async function deleteUserById(userId) {
  const client = await db.query('BEGIN');

  try {
    const deleteQuery = `
      DELETE FROM users
      WHERE user_id = $1;
    `;

    await db.query(deleteQuery, [userId]);
    await db.query('COMMIT');
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = { deleteUserById };
