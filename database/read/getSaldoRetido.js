const db = require('../../database');

async function getSaldoRetido(seller_id) {

  try {

    const query = `
      SELECT SUM(saldo_retido) AS saldo_retido_total
      FROM transactions_anuncio
      WHERE seller_id = $1;
    `;

    const result = await db.query(query, [seller_id]);
    return result.rows[0].saldo_retido_total || 0;

  } catch (error) {

    throw error;

  }
}

module.exports = { getSaldoRetido };
