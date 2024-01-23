const { getAdByIdDatabase } = require('../../database/getAdByIdDatabase');
const { getCategoryByIdDatabase } = require('../../database/getCategoryByIdDatabase');
const { deleteAdByIdDatabase } = require('../../database/deleteAdByIdDatabase');

async function submitDeleteAdModal(interaction) {
  try {
    if (interaction.customId === 'deleteAdModal') {
      await interaction.deferReply({ ephemeral: true });

      const ad_id = interaction.fields.getTextInputValue('anuncioID');

      // Verifica se o anúncio existe no banco de dados
      const existingAd = await getAdByIdDatabase(ad_id);

      if (existingAd) {
        // Obtém informações da categoria associada ao anúncio
        const category_id = existingAd.categoria_id;
        const category = await getCategoryByIdDatabase(category_id);

        await deleteAdByIdDatabase(ad_id);

        if (category) {

          const channelId = category.channel_id;
          const message = await interaction.client.channels.cache.get(channelId).messages.fetch(ad_id);
          await message.delete();

          await interaction.editReply({ content: "Anúncio deletado!", ephemeral: true });
        } else {
          console.error('Categoria não encontrada para o anúncio:', ad_id);
          await interaction.editReply({ content: "Ocorreu um erro ao obter informações da categoria.", ephemeral: true });
        }
      } else {
        // O anúncio não existe, retornar mensagem de erro
        await interaction.editReply({ content: "Você digitou o ID de um anúncio inexistente.", ephemeral: true });
      }
    }
  } catch (error) {
    console.error('Erro na atualização de dados:', error);
    await interaction.editReply({ content: "Ocorreu um erro ao processar sua solicitação.", ephemeral: true });
  }
}

module.exports = {
  submitDeleteAdModal,
};
