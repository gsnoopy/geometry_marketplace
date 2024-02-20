const db = require('../../database');

async function registerTransactionSaldo(user_id, mp_id, channel_id, transaction_amount) {

  const client = await db.query('BEGIN');

  try {

    const insertTransactionQuery = `
      INSERT INTO transactions_saldo (user_id, mp_id, channel_id, transaction_amount)
      VALUES ($1, $2, $3, $4)
      RETURNING transaction_id, transaction_datetime;
    `;

    const insertTransactionResult = await db.query(insertTransactionQuery, [user_id, mp_id, channel_id, transaction_amount]);

    await db.query('COMMIT');
    const { transaction_id, transaction_datetime } = insertTransactionResult.rows[0];
    return { transaction_id, transaction_datetime };

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { registerTransactionSaldo };
