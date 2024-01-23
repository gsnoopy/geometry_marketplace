const Discord = require("discord.js");
const { getAdByUser } = require("../../database/getAdByUserDatabase");
const { getUserDatabase } = require('../../database/getUserDatabase');

module.exports = {
  name: "perfil",
  description: "Acesse o seu perfil e veja seus dados.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    try {
      
        await interaction.deferReply({ ephemeral: true });

        const userData = await getUserDatabase(interaction.user.id);
        const announcementsData = await getAdByUser(interaction.user.id);

        if (userData) {

            const userId = interaction.user.id;
            const userDiscordName = interaction.user.tag
            const userAvatar = interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }); 
            const userName = userData.name;
            const userEmail = userData.email;
            const userCPF = userData.cpf;
            const userPIX = userData.pix;
            const userBalance = userData.saldo;
            const userInvitedBy = userData.cupom;

            const embed = new Discord.EmbedBuilder()
                .setColor(0x00958F)
                .setTitle(`Olá ${userDiscordName}, esse é o seu perfil!`)
                .setThumbnail(userAvatar)
                .setDescription("Não hesite em alterar os seguintes dados se necessário:")
                .addFields(
                    { name: 'Nome:', value: userName},
                    { name: 'ID:', value: userId },
                    { name: 'CPF:', value: userCPF},
                    { name: 'Email:', value: userEmail},
                    { name: 'Chave PIX:', value: userPIX},
                    { name: 'Saldo:', value: userBalance},
                    { name: 'Indicado por:', value: userInvitedBy},
                )
                .setTimestamp()

                if (announcementsData.length > 0) {
                  const announcementsField = {
                    name: 'Anúncios ativos:',
                    value: announcementsData.map(ad => `ID: ${ad.message_id} | Title: ${ad.title}`).join('\n'),
                  };
                  embed.addFields(announcementsField);
                }
            
            const buttons = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("editProfile")
                .setLabel("Editar perfil")
                .setEmoji("⚙️")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setCustomId("deleteAd")
                .setLabel("Excluir um anúncio")
                .setEmoji("⚙️")
                .setStyle(Discord.ButtonStyle.Primary),
            );
            
            await interaction.editReply({ embeds: [embed], components: [buttons], ephemeral: true });

      } else {

            await interaction.reply({ content: "Usuário não encontrado.", ephemeral: true });

      }
    } catch (error) {

        console.error('Erro ao processar comando "perfil":', error);
        await interaction.reply({ content: "Erro ao processar o comando.", ephemeral: true });

    }
  },
};
