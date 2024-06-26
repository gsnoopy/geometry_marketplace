const db = require('../../database');

async function getCategoryByChannel(channel_id) {
  const client = await db.query('BEGIN');

  try {
    const selectCategoryQuery = `
      SELECT * FROM categorias
      WHERE channel_id = $1;
    `;

    const selectCategoryResult = await db.query(selectCategoryQuery, [channel_id]);
    await db.query('COMMIT');

    if (selectCategoryResult.rows.length > 0) {
      return selectCategoryResult.rows[0].id;
    } else {
      return null;
    }
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = { getCategoryByChannel };
