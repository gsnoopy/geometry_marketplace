const Discord = require("discord.js");

const { getAdByUser } = require("../../database/read/getAdByUser");
const { getUserById } = require('../../database/read/getUserById');
const { getSaldoRetido } = require("../../database/read/getSaldoRetido");

module.exports = {
  name: "perfil",
  description: "[MEMBER] Acesse o seu perfil e veja seus dados.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client,interaction) => {

    try {
      
      await interaction.deferReply({ ephemeral: true });

      const user = await getUserById(interaction.user.id);
      const announcementsData = await getAdByUser(interaction.user.id);
      const saldoRetido = await getSaldoRetido(interaction.user.id);

      if (user) {

        const userId = interaction.user.id;
        const userDiscordName = interaction.user.tag;
        const userAvatar = interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }); 
        const userName = user.name;
        const userEmail = user.email;
        const userKey = user.pix;
        const userBalance = user.saldo;

        const embed = new Discord.EmbedBuilder()
          .setColor(0x020202)
          .setTitle(`Olá ${userDiscordName}, esse é o seu perfil!`)
          .setThumbnail(userAvatar)
          .setDescription("Não hesite em alterar os seguintes dados se necessário:")
          .addFields(
            { name: '<:Name:1199292094368448572> Nome:', value: userName},
            { name: '<:idBadge:1199292190933917696> ID:', value: userId },
            { name: '<:mailProfile:1199292107035262996> Email:', value: userEmail},
            { name: '<:pixKey:1199292080145584191> Chave PIX:', value: userKey},
            { name: '<:ProfileSaldo:1199292067734630500> Saldo:', value: userBalance},
            { name: '<:ProfileSaldo:1199292067734630500> Saldo bloqueado:', value: String(saldoRetido)},
          )
          .setTimestamp()

        if (announcementsData.length > 0 && announcementsData.length < 5) {

          const announcementsField = {
            name: 'Anúncios ativos:',
            value: announcementsData.map(ad => `**Title:** ${ad.title} | **Key:** ${ad.key} `).join('\n'),
          };
          embed.addFields(announcementsField);

        }

        if (announcementsData.length > 5) {

          const announcementsField = {
            name: 'Anúncios ativos:',
            value: "Você possui muitos anúncios ativos, por favor **utilize o comando /anuncios** para listagem",
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
        await interaction.reply({ content: "Erro ao processar o comando profile.", ephemeral: true });

    }
  }
};
