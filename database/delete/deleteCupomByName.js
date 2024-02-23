const db = require('../../database');

async function deleteCupomByName(nome) {

  const client = await db.query('BEGIN');

  try {

    const deleteCupomQuery = `
      DELETE FROM cupons
      WHERE nome = $1;
    `;

    await db.query(deleteCupomQuery, [nome]);
    await db.query('COMMIT');

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { deleteCupomByName };
