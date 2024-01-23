const { Discord, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');
const { registerAdDatabase } = require('../../database/registerAdDatabase');

async function submitAdModal(interaction) {

  try {
    if (interaction.customId === 'adModal') {

        const { adModalOptions } = interaction.client.tempData || {};
        const selectedOption = adModalOptions ? adModalOptions[0] : null;

        let id_channel;
        let id_category;

        switch (selectedOption) {
          case 'lol_option':
            id_channel = '1198197653062811668';
            id_category = 1
            break;
          case 'valorant_option':
            id_channel = '1198197771904233534';
            id_category = 2
            break;
          case 'fortnite_option':
            id_channel = '1198197670850867290';
            id_category = 3
            break;
          case 'steam_option':
            id_channel = '1198197740526645248';
            id_category = 4
            break;
          case 'keys_option':
            id_channel = '1198197704862478336';
            id_category = 5
            break;
        }

        interaction.deferReply({ content: "Aguarde estamos criando o seu anúncio", ephemeral: true });
      
        const title = interaction.fields.getTextInputValue('titleInput');
        const value = interaction.fields.getTextInputValue('valueInput');
        const description = interaction.fields.getTextInputValue('descriptionInput');
        const link = interaction.fields.getTextInputValue('linkInput');
        const data = interaction.fields.getTextInputValue('dataInput')

        const channel = interaction.guild.channels.cache.get(id_channel);
        const user_id = interaction.user.id
        const userAvatar = interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
        const userDiscordName = interaction.user.tag

        const stringMarkdow = "`"
        const embed = new Discord.EmbedBuilder()
        .setColor(0x00958F)
        .setTitle(`${title}`)
        .setThumbnail(userAvatar)
        .setDescription(`${stringMarkdow}${description}${stringMarkdow}`)
        .addFields(
            { name: 'Valor:', value: value},
            { name: 'Anúnciado por:', value: userDiscordName},
            { name: 'Vendido e intermediado por:', value: 'Geometry Marketplace'},
            { name: 'Lembrete:', value: 'Ao comprar através do nosso sistema você garante segurança no recebimento do produto e auxilia na manutenção do servidor!'},
        )
        .setImage(`${link}`)
        .setTimestamp()
    
      const buttons = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
          .setCustomId("buyAd")
          .setLabel("Comprar produto")
          .setEmoji("💰")
          .setStyle(Discord.ButtonStyle.Secondary),
          new Discord.ButtonBuilder()
          .setCustomId("upAd")
          .setLabel("Up (one/24h)")
          .setEmoji("⬆️")
          .setStyle(Discord.ButtonStyle.Primary),
      );

      if (channel) {
        const sentMessage = await channel.send({ embeds: [embed], components: [buttons]});
        const messageId = sentMessage.id;
        await registerAdDatabase(id_category,description,link,data,title,user_id,value, messageId)

      }

      interaction.editReply({ content: `Anúncio criado em ${id_channel}`, ephemeral: true })

    }
  } catch (error) {
    console.error('Erro:', error);
    interaction.reply({ content: "Erro", ephemeral: true });
  }

}

module.exports = {
  submitAdModal,
};
