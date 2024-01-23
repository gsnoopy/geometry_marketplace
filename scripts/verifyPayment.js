const axios = require('axios');

async function verifyPayment(db, client) {
  try {
    const result = await db.query('SELECT * FROM transactions_saldo');

    for (const pagamento of result.rows) {
      const { mp_id, transaction_datetime, channel_id, transaction_amount, user_id } = pagamento;

      const isApproved = await verifyApprovedPayment(mp_id);

      if (isApproved) {

        await db.query('UPDATE users SET saldo = saldo + $1 WHERE user_id = $2', [transaction_amount, user_id]);

        const channel = client.channels.cache.get(channel_id);

        if (channel) {
          await channel.send('Pagamento aprovado e saldo adicionado! Este canal será fechado em 3 minutos.');
        }

        setTimeout(async () => {
          if (channel) {
            await channel.delete();
          }
        }, 180000); 

        await db.query('DELETE FROM transactions_saldo WHERE mp_id = $1', [mp_id]);

      } else {

        const transactionDatetime = new Date(`${transaction_datetime} UTC`);
        const dataAtual = new Date();
        
        const diffInMinutes = Math.floor((dataAtual - transactionDatetime) / (1000 * 60));
        
        if (diffInMinutes >= 25) {

          const channel = client.channels.cache.get(channel_id);
          if (channel) {
            await channel.send('Pagamento expirado! Este canal será fechado em breve.');
          }

          setTimeout(async () => {
            if (channel) {
              await channel.delete();
            }
          }, 5000);

          await db.query('DELETE FROM transactions_saldo WHERE mp_id = $1', [mp_id]);
        }
      }
    }
  } catch (error) {
    console.error('Erro ao verificar pagamentos:', error);
  }
}

async function verifyApprovedPayment(mp_id) {
  try {
    const response = await axios.get(`https://api.mercadopago.com/v1/payments/${mp_id}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_TOKEN}`,
      },
    });

    return response.data.status === 'approved';
  } catch (error) {
    console.error(`Erro ao verificar pagamento ${mp_id}:`, error.message);
    return false;
  }
}

module.exports = {
  verifyPayment,
};
