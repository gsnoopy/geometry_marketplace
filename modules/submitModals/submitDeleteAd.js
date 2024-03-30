const { getAdByKey } = require('../../database/read/getAdByKey');
const { getCategoryById } = require('../../database/read/getCategoryById');
const { deleteAdById } = require('../../database/delete/deleteAdById');

async function submitDeleteAd(interaction) {

  await interaction.deferReply({ ephemeral: true });

  try {

      const key = interaction.fields.getTextInputValue('adKey');
      const existingAd = await getAdByKey(key);

      if (existingAd) {

        const category_id = existingAd.categoria_id;
        const category = await getCategoryById(category_id);
        const ad_id = existingAd.message_id

        await deleteAdById(ad_id);

        if (category) {

          const channelId = category.channel_id;
          const message = await interaction.client.channels.cache.get(channelId).messages.fetch(ad_id);

          await message.delete();
          await interaction.editReply({ content: "Anúncio deletado!", ephemeral: true });

        } else {

          console.error('Categoria não encontrada para o anúncio:', ad_id);
          await interaction.editReply({ content: "Ocorreu um erro ao deletar seu anúncio.", ephemeral: true });

        }
      } else {

        await interaction.editReply({ content: "Você digitou a Key de um anúncio inexistente.", ephemeral: true });

      }
    
  } catch (error) {

    console.error('Erro na solicitação submitDeleteAd', error);
    await interaction.editReply({ content: "Ocorreu um erro ao deletar seu anúncio.", ephemeral: true });
    
  }
}

module.exports = { submitDeleteAd };
