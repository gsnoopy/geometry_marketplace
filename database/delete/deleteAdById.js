const db = require('../../database');

async function deleteAdById(messageId) {
  const client = await db.query('BEGIN');

  try {
    const deleteAdQuery = `
      DELETE FROM anuncios
      WHERE message_id = $1;
    `;

    await db.query(deleteAdQuery, [messageId]);

    await db.query('COMMIT');
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = { deleteAdById };
