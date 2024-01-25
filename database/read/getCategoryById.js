const db = require('../../database');

async function getCategoryById(categoria_id) {
  const client = await db.query('BEGIN');

  try {
    const selectCategoryQuery = `
      SELECT * FROM categorias
      WHERE id = $1;
    `;

    const selectCategoryResult = await db.query(selectCategoryQuery, [categoria_id]);

    await db.query('COMMIT');

    if (selectCategoryResult.rows.length > 0) {
      return selectCategoryResult.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = { getCategoryById };
