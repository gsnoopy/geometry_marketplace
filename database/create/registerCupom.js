const db = require('../../database');

async function registerCupom(nome) {

  const client = await db.query('BEGIN');

  try {

    const insertCupomQuery = `
      INSERT INTO cupons (nome, usos)
      VALUES ($1, 0)
      RETURNING id;
    `;

    const insertCupomResult = await db.query(insertCupomQuery, [nome]);

    await db.query('COMMIT');
    return insertCupomResult.rows[0].id;
    
  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { registerCupom };
