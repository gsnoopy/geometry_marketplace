const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');
const { getAdByUser } = require("../../database/read/getAdByUser");

async function createAd(interaction) {

        const ads = await getAdByUser(interaction.user.id);

        if (ads.length >= 2) {
            
            await interaction.deferReply({ ephemeral: true });
            interaction.editReply({content: "Você já atingiu o limite máximo de anúncios", ephemeral: true});

          }else {

            const selectedOptions = interaction.client.tempData?.adModalOptions || [];
            
            const modal = new ModalBuilder()
                .setCustomId('adModal')
                .setTitle(`Criando o seu anúncio.`);
    
            const titleInput = new TextInputBuilder()
                .setCustomId('titleInput')
                .setLabel("Titulo do anúncio")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(20)
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
}
  
module.exports = { createAd };
  