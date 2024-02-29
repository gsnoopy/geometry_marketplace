const Discord = require("discord.js");

const { getAdById } = require('../../database/read/getAdById');
const { updateAd } = require('../../database/edit/updateAd');

async function upAd(interaction) {

  try {

    if (interaction.customId === 'upAd') {

      interaction.deferReply({ephemeral: true});

      const userId = interaction.user.id;
      const ad_id = interaction.message.id;
      const existingAd = await getAdById(ad_id);
      const seller_id = existingAd.user_id;

      if(userId != seller_id){

        interaction.editReply({content: "Você não é dono desse anúncio", ephemeral: true});

      }else{

        const dataCriacao = new Date(existingAd.criacao);
        const currentDate = new Date();
        const diffInDays = Math.floor((currentDate - dataCriacao) / (1000 * 60 * 60 * 24)) + 1;;

        if(diffInDays < 1){

          interaction.editReply({content: "Aguarde o anúncio ter 24h de existência para dar up", ephemeral: true});

        }else{

          const channel = interaction.channel;
          const userAvatar = interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
          const userDiscordName = interaction.user.tag;
          const stringMarkdow = "`";

          const embed = new Discord.EmbedBuilder()
            .setColor(0x020202)
            .setTitle(`${existingAd.title}`)
            .setThumbnail(userAvatar)
            .setDescription(`${stringMarkdow}${existingAd.description}${stringMarkdow}`)
            .addFields(
              { name: 'Valor:', value: String(existingAd.value)},
              { name: 'Anúnciado por:', value: userDiscordName},
              { name: 'Vendido e intermediado por:', value: 'Geometry Marketplace'},
              { name: 'Lembrete:', value: 'Ao comprar através do nosso sistema você garante segurança no recebimento do produto e auxilia na manutenção do servidor!'},
            )
            .setImage(`${existingAd.image}`)
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
            const currentDateTime = new Date().toISOString();
            await channel.messages.delete(existingAd.message_id)
            await updateAd(existingAd.message_id,messageId,currentDateTime)

          }

            interaction.editReply({content: "Up realizado", ephemeral: true})

        }
      }
    }
  } catch (error) {
    
    console.error('Erro na função upAd:', error);
    await interaction.followUp({ content: 'Ocorreu um erro ao processar a solicitação upAd.', ephemeral: true });

  }
}

module.exports = { upAd };
