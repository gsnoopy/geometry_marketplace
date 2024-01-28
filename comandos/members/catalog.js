const Discord = require("discord.js");
const { getAdByUser } = require("../../database/read/getAdByUser");

module.exports = {
  name: "anuncios",
  description: "Acesse um menu com todos os seus anúncios ativos.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    try {
      
        await interaction.deferReply({ ephemeral: true });

        const announcementsData = await getAdByUser(interaction.user.id);

        if (announcementsData) {

            const userDiscordName = interaction.user.tag
            const userAvatar = interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }); 

            const embed = new Discord.EmbedBuilder()
                .setColor(0x020202)
                .setThumbnail(userAvatar)
                .addFields(
                  { name: '<:idBadge:1199292190933917696>', value: userDiscordName},
              )
                .setTimestamp()

                if (announcementsData.length > 0) {
                  const announcementsField = {
                    name: '**Anúncios ativos:**',
                    value: announcementsData.map(ad => `ID: ${ad.message_id} | Title: ${ad.title}`).join('\n'),
                  };
                  embed.addFields(announcementsField);
                }
            
            const button = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("deleteAd")
                .setLabel("Excluir um anúncio")
                .setEmoji("<:deleteAd:1199292226988154880>")
                .setStyle(Discord.ButtonStyle.Primary)
            );
            
            await interaction.editReply({ embeds: [embed], components: [button], ephemeral: true });

      } else {

            await interaction.reply({ content: "Você não possui anúncio ativo", ephemeral: true });

      }
    } catch (error) {

        console.error('Erro ao processar comando "anuncios":', error);
        await interaction.reply({ content: "Erro ao processar o comando.", ephemeral: true });

    }
  },
};
