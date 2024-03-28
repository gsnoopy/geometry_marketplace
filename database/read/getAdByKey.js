const db = require('../../database');

async function getAdByKey(key) {

  const client = await db.query('BEGIN');

  try {
    
    const selectAdQuery = `
      SELECT *, categoria_id FROM anuncios
      WHERE key = $1;
    `;

    const selectAdResult = await db.query(selectAdQuery, [key]);
    await db.query('COMMIT');

    if (selectAdResult.rows.length > 0) {

      return selectAdResult.rows[0];

    } else {

      return null;

    }

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;

  }
}

module.exports = { getAdByKey };
