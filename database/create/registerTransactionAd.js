const db = require('../../database');

async function registerTransactionAd(seller_id, buyer_id, saldo, saldo_retido, taxa, categoria_id, title) {

  const client = await db.query('BEGIN');

  try {

    const insertTransactionQuery = `
      INSERT INTO transactions_anuncio (seller_id, buyer_id, saldo, saldo_retido, taxa, categoria_id, title)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING transaction_id, data_hora;
    `;

    const insertTransactionResult = await db.query(insertTransactionQuery, [seller_id, buyer_id, saldo, saldo_retido, taxa, categoria_id, title]);

    await db.query('COMMIT');
    const { transaction_id, data_hora } = insertTransactionResult.rows[0];
    return { transaction_id, data_hora };

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { registerTransactionAd };
