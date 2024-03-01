const db = require('../../database');

async function registerSaque(user_id, valor, valor_taxado) {
  const client = await db.query('BEGIN');

  try {
    const insertSaqueQuery = `
      INSERT INTO saques (user_id, valor, valor_taxado, data_registro)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      RETURNING *;
    `;

    const insertSaqueResult = await db.query(insertSaqueQuery, [user_id, valor, valor_taxado]);

    await db.query('COMMIT');
    return insertSaqueResult.rows[0];
    
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = { registerSaque };
