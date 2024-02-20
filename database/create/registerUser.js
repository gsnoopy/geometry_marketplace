const db = require('../../database');

async function registerUser(name, email, pix, userID, saldo, cupom) {

  const client = await db.query('BEGIN');

  try {

    const insertUsuarioQuery = `
      INSERT INTO users (name, email, pix, user_id, saldo, cupom)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id;
    `;

    const insertUsuarioResult = await db.query(insertUsuarioQuery, [name, email, pix, userID, saldo, cupom]);

    await db.query('COMMIT');
    return insertUsuarioResult.rows[0].user_id;

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { registerUser };
