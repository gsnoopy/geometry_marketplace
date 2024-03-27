const { getAllAdKeys } = require('../database/read/getAllAdKeys')

async function checkKeyExistsInDatabase(key) {
    const existingKeys = await getAllAdKeys();
    return existingKeys.includes(key);
  }
  
async function generateUniqueKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    while (true) {
      let key = '';
  
      // Gerar a chave aleatória
      for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        key += characters.charAt(randomIndex);
      }
  
      // Verificar se a chave já existe no banco de dados
      const existingAd = await checkKeyExistsInDatabase(key);
  
      if (!existingAd) {
        return key; // Retornar a chave única
      }
      
      // Gerar uma nova chave se a chave já existir
    }
  }
  
  module.exports = { generateUniqueKey };
  