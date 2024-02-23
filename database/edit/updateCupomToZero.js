const db = require('../../database');

async function updateCupomToZero(cuponName) {

  const client = await db.query('BEGIN');

  try {

    const updateCuponQuery = `
      UPDATE cupons
      SET usos = 0
      WHERE nome = $1;
    `;

    await db.query(updateCuponQuery, [cuponName]);
    await db.query('COMMIT');

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;

  }
}

module.exports = { updateCupomToZero };
