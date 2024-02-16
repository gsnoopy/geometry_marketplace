const db = require('../../database');

async function deleteTransactionsSaldoById(userId) {
  const client = await db.query('BEGIN');

  try {
    const deleteTransactionQuery = `
      DELETE FROM transactions_saldo
      WHERE user_id = $1;
    `;

    await db.query(deleteTransactionQuery, [userId]);

    await db.query('COMMIT');
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = { deleteTransactionsSaldoById };
