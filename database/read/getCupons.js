const db = require('../../database');

async function getCupons() {

  const client = await db.query('BEGIN');

  try {

    const selectCuponsQuery = `
      SELECT nome, usos
      FROM cupons;
    `;

    const selectCuponsResult = await db.query(selectCuponsQuery);

    await db.query('COMMIT');
    return selectCuponsResult.rows;

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { getCupons };
