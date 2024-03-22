const Discord = require("discord.js")
const { getAdById } = require("../../database/read/getAdById")
const { getCategoryById } = require("../../database/read/getCategoryById")
const { deleteAdById } = require("../../database/delete/deleteAdById");

module.exports = {
  name: "deletar_ad",
  description: "[ADM] deletar anúncio impróprio",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "id",
      description: "Digita o ID do anúncio",
      required: true
    }
],
  run: async (client,interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

        await interaction.deferReply({ ephemeral: true });

        try {
      
            const ad_id = interaction.options.getString("id");
            const existingAd = await getAdById(ad_id);
      
            if (existingAd) {
      
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
                await interaction.editReply({ content: "Ocorreu um erro ao deletar o anúncio.", ephemeral: true });
      
              }
            } else {
      
              await interaction.editReply({ content: "Você digitou o ID de um anúncio inexistente.", ephemeral: true });
      
            }
          
        } catch (error) {
      
          console.error('Erro na solicitação deleteImproprio', error);
          await interaction.editReply({ content: "Ocorreu um erro ao deletar o anúncio.", ephemeral: true });
          
        }

    }
  }
}