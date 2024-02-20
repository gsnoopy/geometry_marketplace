const db = require('../database');
const { Discord } = require('../imports');

const { getUserById } = require('../database/read/getUserById');
const { updateUserSaldo } = require('../database/edit/updateUserSaldo');
const { registerSale } = require('../database/create/registerSale');
const { createLog } = require('../logs/createLog');

async function verifyAds(db, client) {

  try {

    const result = await db.query('SELECT * FROM transactions_anuncio');

    for (const transaction of result.rows) {

      const { transaction_id, data_hora, seller_id, buyer_id, categoria_id, taxa, saldo_retido } = transaction;

      const transactionDatetime = new Date(data_hora);
      const currentDate = new Date();    
      const diffInDays = Math.floor((currentDate - transactionDatetime) / (1000 * 60 * 60 * 24)) + 1;
    
      if (diffInDays >= 1) {

        const user = await getUserById(seller_id);

        const newSaldo = (Number(user.saldo) + Number(saldo_retido)).toFixed(2)
        await updateUserSaldo(seller_id, newSaldo);
        const revenue = (taxa - (taxa * 0.01)).toFixed(2)
        await registerSale(buyer_id,seller_id,categoria_id,taxa,revenue)

        await db.query('DELETE FROM transactions_anuncio WHERE transaction_id = $1', [transaction_id]);

        let embed = new Discord.EmbedBuilder()
          .setColor(0x00F4FF)
          .setDescription(`R$ ${saldo_retido} processado para <@${user.user_id}>`)
          .setTimestamp()

        await createLog(client, '1204476284529287258', embed)

      }
    }
  } catch (error) {

    console.error('Erro ao verificar transações de anúncios:', error);
    
  }
}

module.exports = { verifyAds };
