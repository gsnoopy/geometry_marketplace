const Discord = require("discord.js");
const { getUserDatabase } = require('../../modules/getUserDatabase');

module.exports = {
  name: "perfil",
  description: "Acesse o seu perfil e veja seus dados.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    try {

        const userData = await getUserDatabase(interaction.user.id);

        if (userData) {

            const userId = interaction.user.id;
            const userDiscordName = interaction.user.tag
            const userAvatar = interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }); 
            const userName = userData.name;
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
                    { name: 'Chave PIX:', value: userPIX},
                    { name: 'Saldo:', value: userBalance},
                    { name: 'Indicado por:', value: userInvitedBy},
                )
                .setTimestamp()
            
            const button = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("editProfile")
                .setLabel("Editar perfil")
                .setEmoji("⚙️")
                .setStyle(Discord.ButtonStyle.Primary),
            );
            
            await interaction.reply({ embeds: [embed], components: [button], ephemeral: true });

      } else {

            await interaction.reply({ content: "Usuário não encontrado.", ephemeral: true });

      }
    } catch (error) {

        console.error('Erro ao processar comando "perfil":', error);
        await interaction.reply({ content: "Erro ao processar o comando.", ephemeral: true });

    }
  },
};
