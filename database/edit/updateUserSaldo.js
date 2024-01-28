const db = require('../../database');

async function updateUserSaldo(userId, newSaldo) {
  const client = await db.query('BEGIN');

  try {
    const updateSaldoQuery = `
      UPDATE users
      SET saldo = $1
      WHERE user_id = $2;
    `;

    await db.query(updateSaldoQuery, [newSaldo, userId]);

    await db.query('COMMIT');
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = { updateUserSaldo };
