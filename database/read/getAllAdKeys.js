const db = require('../../database');

async function getAllAdKeys() {
  const client = await db.query('BEGIN');
  
  try {
    const selectAdKeysQuery = `
      SELECT key FROM anuncios;
    `;
    
    const selectAdKeysResult = await db.query(selectAdKeysQuery);
    await db.query('COMMIT');
    
    const adKeys = selectAdKeysResult.rows.map(row => row.key);
    return adKeys;
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = { getAllAdKeys };
