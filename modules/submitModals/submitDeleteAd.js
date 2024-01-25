const { getAdById } = require('../../database/read/getAdById');
const { getCategoryById } = require('../../database/read/getCategoryById');
const { deleteAdById } = require('../../database/delete/deleteAdById');

async function submitDeleteAd(interaction) {
  try {
    if (interaction.customId === 'deleteAdModal') {
      await interaction.deferReply({ ephemeral: true });

      const ad_id = interaction.fields.getTextInputValue('anuncioID');

      // Verifica se o anúncio existe no banco de dados
      const existingAd = await getAdById(ad_id);

      if (existingAd) {
        // Obtém informações da categoria associada ao anúncio
        const category_id = existingAd.categoria_id;
        const category = await getCategoryById(category_id);

        await deleteAdById(ad_id);

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

module.exports = { submitDeleteAd };
