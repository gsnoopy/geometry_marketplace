const db = require('../../database');

async function getAdById(ad_id) {

  const client = await db.query('BEGIN');

  try {
    
    const selectAdQuery = `
      SELECT *, categoria_id FROM anuncios
      WHERE message_id = $1;
    `;

    const selectAdResult = await db.query(selectAdQuery, [ad_id]);
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

module.exports = { getAdById };
