const db = require('../../database');

async function createCategory(name, channel_id) {
  const client = await db.query('BEGIN');

  try {
    const insertCategoryQuery = `
      INSERT INTO categorias (name, channel_id)
      VALUES ($1, $2)
      RETURNING id;
    `;

    const insertCategoryResult = await db.query(insertCategoryQuery, [name, channel_id]);

    await db.query('COMMIT');
    return insertCategoryResult.rows[0].id;

  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = { createCategory };
