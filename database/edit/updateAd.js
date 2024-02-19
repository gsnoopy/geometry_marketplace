const db = require('../../database');

async function updateAd(messageId, newMessageId) {
  const client = await db.query('BEGIN');

  try {
    const updateAdQuery = `
      UPDATE anuncios
      SET message_id = $1
      WHERE message_id = $2;
    `;

    await db.query(updateAdQuery, [newMessageId, messageId]);

    await db.query('COMMIT');
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = { updateAd };
