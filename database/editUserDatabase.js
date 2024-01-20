const db = require('../database');

async function editUserDatabase(userID, newName, newCPF, newPIX) {
  const client = await db.query('BEGIN');

  try {
    // Constrói a query dinamicamente com base nos campos não nulos e não vazios
    let updateUsuarioQuery = 'UPDATE users SET';
    const queryParams = [];

    // Adiciona apenas os campos não nulos e não vazios à query
    let paramIndex = 1; // Índice inicial para os parâmetros
    if (newName !== null && newName !== undefined && newName !== '') {
      updateUsuarioQuery += ` name = $${paramIndex},`;
      queryParams.push(newName);
      paramIndex++;
    }

    if (newCPF !== null && newCPF !== undefined && newCPF !== '') {
      updateUsuarioQuery += ` cpf = $${paramIndex},`;
      queryParams.push(newCPF);
      paramIndex++;
    }

    if (newPIX !== null && newPIX !== undefined && newPIX !== '') {
      updateUsuarioQuery += ` pix = $${paramIndex},`;
      queryParams.push(newPIX);
      paramIndex++;
    }

    // Remove a vírgula extra do final da query, se houver campos para atualizar
    if (queryParams.length > 0) {
      updateUsuarioQuery = updateUsuarioQuery.slice(0, -1);
    }

    // Adiciona a condição WHERE para o userID e sempre retorna user_id
    updateUsuarioQuery += ` WHERE user_id = $${paramIndex} RETURNING user_id;`;

    // Adiciona o userID ao final do array de parâmetros
    queryParams.push(userID);

    // Executa a query
    const updateUsuarioResult = await db.query(updateUsuarioQuery, queryParams);

    await db.query('COMMIT');

    // Retorna o userID atualizado, mesmo se nenhuma alteração ocorrer
    return updateUsuarioResult.rows[0].user_id;
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}

module.exports = {
  editUserDatabase,
};
