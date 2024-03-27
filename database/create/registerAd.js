const db = require('../../database');

async function registerAd(categoryId, description, image, information, title, userId, value, messageId, key) {

  const client = await db.query('BEGIN');

  try {

    const insertAdQuery = `
      INSERT INTO anuncios (categoria_id, description, image, information, title, user_id, value, message_id, key, criacao)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      RETURNING anuncio_id;
    `;

    const insertAdResult = await db.query(insertAdQuery, [categoryId, description, image, information, title, userId, value, messageId, key]);

    await db.query('COMMIT');
    return insertAdResult.rows[0].anuncio_id;

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { registerAd };
