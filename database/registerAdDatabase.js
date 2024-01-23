const db = require('../database');

async function registerAdDatabase(categoryId, description, image, information, title, userId, value, messageId) {
  const client = await db.query('BEGIN');

  try {
    const insertAdQuery = `
      INSERT INTO anuncios (categoria_id, description, image, information, title, user_id, value, message_id, criacao)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING anuncio_id;
    `;

    const insertAdResult = await db.query(insertAdQuery, [categoryId, description, image, information, title, userId, value, messageId]);

    await db.query('COMMIT');

    return insertAdResult.rows[0].anuncio_id;
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = {
  registerAdDatabase
};
