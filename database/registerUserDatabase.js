const db = require('../database');

async function registerUserDatabase(name, email, cpf, pix, userID, saldo, saldo_retristo, cupom) {
  const client = await db.query('BEGIN');

  try {
    const insertUsuarioQuery = `
      INSERT INTO users (name, email, cpf, pix, user_id, saldo, saldo_restrito, cupom)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING user_id;
    `;

    const insertUsuarioResult = await db.query(insertUsuarioQuery, [name, email, cpf, pix, userID, saldo, saldo_retristo, cupom]);

    await db.query('COMMIT');

    return insertUsuarioResult.rows[0].user_id;
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = {
    registerUserDatabase
};
