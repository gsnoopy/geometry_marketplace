const Discord = require("discord.js");
const { getAdById } = require('../../database/read/getAdById');

async function upAd(interaction) {
  try {
    if (interaction.customId === 'upAd') {

        interaction.deferReply({ephemeral: true})
        const userId = interaction.user.id
        const ad_id = interaction.message.id;
        const existingAd = await getAdById(ad_id);
        const seller_id = existingAd.user_id

        if(userId != seller_id){
            interaction.editReply({content: "Você não é dono desse anúncio", ephemeral: true});
        }else{

            const dataCriacao = existingAd.criacao;
            const currentTime = 0 // ;
            const channel = interaction.channel

            

        }
        
    }
  } catch (error) {
    console.error('Erro na função upAd:', error);
    await interaction.followUp({ content: 'Ocorreu um erro ao processar sua solicitação.', ephemeral: true });
  }
}

module.exports = { upAd };
