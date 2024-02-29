const db = require('../../database');

async function updateAd(messageId, newMessageId, newCreationDate) {

  const client = await db.query('BEGIN');

  try {

    const updateAdQuery = `
      UPDATE anuncios
      SET message_id = $1, criacao = $2
      WHERE message_id = $3;
    `;

    await db.query(updateAdQuery, [newMessageId, newCreationDate, messageId]);
    await db.query('COMMIT');

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { updateAd };
