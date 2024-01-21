const db = require('../database');

async function registerTransactionsDatabase(user_id, mp_id, channel_id, transaction_amount) {
  const client = await db.query('BEGIN');

  try {
    const insertTransactionQuery = `
      INSERT INTO transactions (user_id, mp_id, channel_id, transaction_amount)
      VALUES ($1, $2, $3, $4)
      RETURNING transaction_id;
    `;

    const insertTransactionResult = await db.query(insertTransactionQuery, [user_id, mp_id, channel_id, transaction_amount]);

    await db.query('COMMIT');

    return insertTransactionResult.rows[0].transaction_id;
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = {
    registerTransactionsDatabase,
};
