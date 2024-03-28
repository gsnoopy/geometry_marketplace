const { Discord, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');

const { registerAd } = require('../../database/create/registerAd');
const { generateUniqueKey } = require('../../utils/generateKey');

async function submitAd(interaction) {

  await interaction.deferReply({ ephemeral: true });

  try {

      const { adModalOptions } = interaction.client.tempData || {};
      const selectedOption = adModalOptions ? adModalOptions[0] : null;

      let id_channel;
      let id_category;

      switch (selectedOption) { 
        case 'lol_smurf':
          id_channel = '1198197653062811668';
          id_category = 1
          break;
        case 'lol_handlevel':
          id_channel = '1210596773836361728';
           id_category = 2
          break;
        case 'lol_outros':
          id_channel = '1210596921392111677';
          id_category = 3
          break;          
        case 'valorant_option':
          id_channel = '1198197771904233534';
          id_category = 4
          break;
        case 'fortnite_option':
          id_channel = '1198197670850867290';
          id_category = 5
          break;
        case 'steam_option':
          id_channel = '1198197740526645248';
          id_category = 6
          break;
        case 'keys_option':
          id_channel = '1210597175202021426';
          id_category = 7
          break;
        case 'services_option':
          id_channel = '1210597201894445157';
          id_category = 8
          break;
        }
      
      const valorString = interaction.fields.getTextInputValue('valueInput');
      const title = interaction.fields.getTextInputValue('titleInput');
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

      const channel = interaction.guild.channels.cache.get(id_channel);
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
          { name: 'Anúnciado por:', value: userDiscordName},
        )
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

        const adKey = await generateUniqueKey()
        const sentMessage = await channel.send({ embeds: [embed], components: [buttons]});
        const messageId = sentMessage.id;
        await registerAd(id_category,description,link,data,title,user_id,value, messageId, adKey)
        await interaction.editReply({ content: `Anúncio criado em <#${channel}>`, ephemeral: true })
        
      }

  } catch (error) {

    console.error('Erro ao processar a solicitação submitAd', error);
    await interaction.editReply({ content: "Erro ao processar a solicitação criar anúncio", ephemeral: true });

  }

}

module.exports = { submitAd };
