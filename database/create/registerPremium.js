const db = require('../../database');

async function registerPremium(user_id) {

  const client = await db.query('BEGIN');

  try {

    const insertPremiumQuery = `
      INSERT INTO premiums (user_id)
      VALUES ($1)
      RETURNING data_registro;
    `;

    const insertPremiumResult = await db.query(insertPremiumQuery, [user_id]);

    await db.query('COMMIT');
    const { data_registro } = insertPremiumResult.rows[0];
    return { data_registro };

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { registerPremium };
