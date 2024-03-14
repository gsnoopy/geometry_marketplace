const { Discord, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');

const { registerAd } = require('../../database/create/registerAd');

async function submitAdPremium(interaction) {

  await interaction.deferReply({ ephemeral: true });

  try {
      
        const title = interaction.fields.getTextInputValue('titleInput');
        const valorString = interaction.fields.getTextInputValue('valueInput');
        const description = interaction.fields.getTextInputValue('descriptionInput');
        const link = interaction.fields.getTextInputValue('linkInput');
        const data = interaction.fields.getTextInputValue('dataInput');

        const valorRegex = /^[0-9]+([,.][0-9]+)?$/;
        if (!valorRegex.test(valorString)) {
          await interaction.editReply({ content: "Insira um valor válido", ephemeral: true });
          return
        }
        
        const value = Number(valorString.replace(',', '.'));
        if (isNaN(value)) {
          await interaction.editReply({ content: "Insira um valor válido", ephemeral: true });
          return
        }
        
        const channel = interaction.channel;
        const user_id = interaction.user.id;
        const userAvatar = interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
        const userDiscordName = interaction.user.tag;

        const stringMarkdow = "`";

        const embed = new Discord.EmbedBuilder()
          .setColor(0x020202)
          .setTitle(`${title}`)
          .setThumbnail(userAvatar)
          .setDescription(`${stringMarkdow}${description}${stringMarkdow}`)
          .addFields(
            { name: 'Valor:', value: String(value)},
            { name: 'Anúnciado por:', value: userDiscordName},          )
          .setImage(`${link}`)
          .setTimestamp()
      
      const buttons = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("buyAd")
            .setLabel("Comprar produto")
            .setEmoji("<:buyAd:1199982419701411840>")
            .setStyle(Discord.ButtonStyle.Primary),
          new Discord.ButtonBuilder()
            .setCustomId("upAd")
            .setLabel("Up 1/24h")
            .setEmoji("<:upAd:1199982423681810483>")
            .setStyle(Discord.ButtonStyle.Primary),
      );

      if (channel) {

        const sentMessage = await channel.send({ embeds: [embed], components: [buttons]});
        const messageId = sentMessage.id;
        await registerAd('6',description,link,data,title,user_id,value, messageId);
        await interaction.editReply({ content: `Anúncio criado em ${channel}`, ephemeral: true });

      }

  } catch (error) {

    console.error('Erro:', error);
    await interaction.editReply({ content: "Erro ao processar a solicitação criar anúncio Premium", ephemeral: true });

  }

}

module.exports = { submitAdPremium };
