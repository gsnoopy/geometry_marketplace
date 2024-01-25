const Discord = require("discord.js");
const { getAdByUser } = require("../../database/read/getAdByUser");
const { getUserById } = require('../../database/read/getUserById');

module.exports = {
  name: "perfil",
  description: "Acesse o seu perfil e veja seus dados.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    try {
      
        await interaction.deferReply({ ephemeral: true });

        const userData = await getUserById(interaction.user.id);
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
                .setColor(0x020202)
                .setTitle(`Olá ${userDiscordName}, esse é o seu perfil!`)
                .setThumbnail(userAvatar)
                .setDescription("Não hesite em alterar os seguintes dados se necessário:")
                .addFields(
                  { name: '<:Name:1199292094368448572> Nome:', value: userName},
                  { name: '<:idBadge:1199292190933917696> ID:', value: userId },
                  { name: '<:mailProfile:1199292107035262996> Email:', value: userEmail},
                  { name: '<:pixKey:1199292080145584191> Chave PIX:', value: userPIX},
                  { name: '<:ProfileSaldo:1199292067734630500> Saldo:', value: userBalance},
                  { name: '<:cupomProfile:1199292242649690153> Indicado por:', value: userInvitedBy},
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
                .setLabel("Editar Perfil")
                .setEmoji("<:editProfile:1199292213969047623>")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setCustomId("deleteAd")
                .setLabel("Excluir um anúncio")
                .setEmoji("<:deleteAd:1199292226988154880>")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setCustomId("bePremium")
                .setLabel("Seja Premium")
                .setEmoji("<:userPremium:1199982425141424128>") 
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
