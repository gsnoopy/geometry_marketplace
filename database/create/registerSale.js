const db = require('../../database');

async function registerSale(userId, sellerId, category, value, revenue) {

  const client = await db.query('BEGIN');

  try {
    
    const insertSalesQuery = `
      INSERT INTO sales (user_id, seller_id, category, value, revenue, data)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING sale_id;
    `;

    const insertSalesResult = await db.query(insertSalesQuery, [userId, sellerId, category, value, revenue]);

    await db.query('COMMIT');
    return insertSalesResult.rows[0].sale_id;

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { registerSale };
