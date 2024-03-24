const db = require('../../database');

async function getAllUserIds() {
  const client = await db.query('BEGIN');
  
  try {
    const selectUserIdsQuery = `
      SELECT user_id FROM users;
    `;
    
    const selectUserIdsResult = await db.query(selectUserIdsQuery);
    await db.query('COMMIT');
    
    const userIds = selectUserIdsResult.rows.map(row => row.user_id);
    return userIds;
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = { getAllUserIds };
