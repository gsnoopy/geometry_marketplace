const { getUserById } = require('../../database/read/getUserById');
const { updateUserSaldo } = require('../../database/edit/updateUserSaldo');
const { registerSale } = require('../../database/create/registerSale');



async function confirmBoost(interaction) {
  try {

    if (interaction.customId === 'confirmEveryone') {
      await interaction.deferReply({ ephemeral: true });
      const user = await getUserById(interaction.user.id);
      const saldo_user = user.saldo;
      const saldo_final = (saldo_user - process.env.EVERYONE_PRICE).toFixed(2);
      const revenue = (process.env.EVERYONE_PRICE - (process.env.EVERYONE_PRICE * 0.01)).toFixed(2);

      await updateUserSaldo(interaction.user.id, saldo_final)
      await registerSale(interaction.user.id,'Geometry Marketplace','11',process.env.EVERYONE_PRICE,revenue)

      interaction.channel.send('@everyone')
      interaction.editReply({content: 'Notificação enviada para todos.', ephemeral: false })
        

    }

    if (interaction.customId === 'confirmHere'){

        await interaction.deferReply({ ephemeral: true });
        const user = await getUserById(interaction.user.id);
        const saldo_user = user.saldo;
        const saldo_final = (saldo_user - process.env.HERE_PRICE).toFixed(2);
        const revenue = (process.env.HERE_PRICE - (process.env.HERE_PRICE * 0.01)).toFixed(2);
  
        await updateUserSaldo(interaction.user.id, saldo_final)
        await registerSale(interaction.user.id,'Geometry Marketplace','12',process.env.HERE_PRICE,revenue)
  
        interaction.channel.send('@here')
        interaction.editReply({content: 'Notificação enviada para todos os onlines.', ephemeral: false })

    }
      
    
  } catch (error) {
    console.error('Erro na função confirmBoost:', error);
    await interaction.followUp({ content: 'Ocorreu um erro ao processar sua solicitação.', ephemeral: true });
  }
}

module.exports = { confirmBoost };