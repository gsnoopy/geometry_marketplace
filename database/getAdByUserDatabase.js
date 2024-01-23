const db = require('../database');

async function getAdByUser(userId) {
  const client = await db.query('BEGIN');

  try {
    const selectAdsQuery = `
      SELECT message_id, title FROM anuncios
      WHERE user_id = $1;
    `;

    const selectAdsResult = await db.query(selectAdsQuery, [userId]);

    await db.query('COMMIT');

    return selectAdsResult.rows;
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = {
  getAdByUser,
};
