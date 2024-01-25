const { getAdById } = require('../../database/read/getAdById');
const { getUserById } = require('../../database/read/getUserById');
const { confirmBuy } = require('./confirmBuy');

async function buyAd(interaction) {
  try {
    if (interaction.customId === 'buyAd') {
      await interaction.deferReply({ ephemeral: true });

      const ad_id = interaction.message.id;
      const user_id = interaction.user.id;
      const existingAd = await getAdById(ad_id);

      if (existingAd) {
        const user = await getUserById(user_id);
        const saldo = user.saldo;

        if (saldo >= existingAd.value) {
          const saldoFinal = Number(saldo - existingAd.value);

          // Chama a função confirmBuy e aguarda a resposta do usuário
          const confirmation = await confirmBuy(interaction, existingAd, user, saldo, saldoFinal);

          if (confirmation) {
            // Lógica para confirmar a compra
            // ...
            await interaction.followUp({ content: 'Compra confirmada!', ephemeral: true });
          } else {
            await interaction.followUp({ content: 'Compra cancelada.', ephemeral: true });
          }
        } else {
          await interaction.editReply({ content: 'Você não possui saldo suficiente', ephemeral: true });
        }
      }
    }
  } catch (error) {
    console.error('Erro na função buyAd:', error);
    await interaction.followUp({ content: 'Ocorreu um erro ao processar sua solicitação.', ephemeral: true });
  }
}

module.exports = { buyAd };
