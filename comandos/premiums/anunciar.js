const Discord = require("discord.js")
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');

module.exports = {
  name: "anunciar",
  description: "[PREMIUM] Crie quantidade ilimitada de anúncios",
  type: Discord.ApplicationCommandType.ChatInput,


  run: async (client, interaction) => {

    const premiumRole = process.env.PREMIUM_ID;
    
    try{

        if (!interaction.member.roles.cache.has(premiumRole)) {

            interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

        } else {

            const modal = new ModalBuilder()
                .setCustomId('adModalPremium')
                .setTitle(`Criando o seu anúncio.`);
        
                const titleInput = new TextInputBuilder()
                .setCustomId('titleInput')
                .setLabel("Titulo do anúncio")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(35)
                .setMinLength(5);

            const valueInput = new TextInputBuilder()
                .setCustomId('valueInput')
                .setLabel("Valor do produto")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(6)
                .setMinLength(1);

            const descriptionInput = new TextInputBuilder()
                .setCustomId('descriptionInput')
                .setLabel("Descrição do anúncio")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setMaxLength(500)
                .setMinLength(30);

            const linkInput = new TextInputBuilder()
                .setCustomId('linkInput')
                .setLabel("Link da imagem do anúncio")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(150)
                .setMinLength(1);

            const dataInput = new TextInputBuilder()
                .setCustomId('dataInput')
                .setLabel("Dados que serão enviados para o comprador")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setMaxLength(200)
                .setMinLength(1);
        
            const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
            const secondActionRow = new ActionRowBuilder().addComponents(valueInput);
            const thirdActionRow = new ActionRowBuilder().addComponents(descriptionInput);
            const fourthActionRow = new ActionRowBuilder().addComponents(linkInput);
            const fifthActionRow = new ActionRowBuilder().addComponents(dataInput);
    
            modal.addComponents(firstActionRow);
            modal.addComponents(secondActionRow);
            modal.addComponents(thirdActionRow);
            modal.addComponents(fourthActionRow);
            modal.addComponents(fifthActionRow);

            interaction.showModal(modal);
        }

    }catch(error){

      console.error('Erro ao processar comando "anunciar":', error);
      await interaction.reply({ content: "Erro ao processar o comando anunciar.", ephemeral: true });

    }
  }
}