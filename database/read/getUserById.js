const db = require('../../database');

async function getUserById(userId) {

  const client = await db.query('BEGIN');

  try {

    const selectUsuarioQuery = `
      SELECT * FROM users
      WHERE user_id = $1;
    `;

    const selectUsuarioResult = await db.query(selectUsuarioQuery, [userId]);
    await db.query('COMMIT');

    if (selectUsuarioResult.rows.length > 0) {

      return selectUsuarioResult.rows[0];

    } else {

      return null;

    }

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { getUserById };
