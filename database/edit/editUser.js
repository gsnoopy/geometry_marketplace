const db = require('../../database');

async function editUser(userID, newName, newEmail, newPIX) {

  const client = await db.query('BEGIN');

  try {

    let updateUsuarioQuery = 'UPDATE users SET';
    const queryParams = [];
    let paramIndex = 1; 

    if (newName !== null && newName !== undefined && newName !== '') {
      updateUsuarioQuery += ` name = $${paramIndex},`;
      queryParams.push(newName);
      paramIndex++;
    }

    if (newEmail !== null && newEmail !== undefined && newEmail !== '') {
      updateUsuarioQuery += ` email = $${paramIndex},`;
      queryParams.push(newEmail);
      paramIndex++;
    }

    if (newPIX !== null && newPIX !== undefined && newPIX !== '') {
      updateUsuarioQuery += ` pix = $${paramIndex},`;
      queryParams.push(newPIX);
      paramIndex++;
    }

    if (queryParams.length > 0) {
      updateUsuarioQuery = updateUsuarioQuery.slice(0, -1);
    }

    updateUsuarioQuery += ` WHERE user_id = $${paramIndex} RETURNING user_id;`;
    queryParams.push(userID);
    const updateUsuarioResult = await db.query(updateUsuarioQuery, queryParams);

    await db.query('COMMIT');
    return updateUsuarioResult.rows[0].user_id;

  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
    
  }
}

module.exports = { editUser };
