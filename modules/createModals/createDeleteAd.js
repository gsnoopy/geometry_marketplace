const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');

function createDeleteAd(interaction) {

        const modal = new ModalBuilder()
            .setCustomId('deleteAdModal')
            .setTitle(`Deletando um anúncio`);
  
        const idAnuncio = new TextInputBuilder()
            .setCustomId('adKey')
            .setLabel("Digite a KEY do anúncio")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(idAnuncio);

        modal.addComponents(firstActionRow);

        interaction.showModal(modal);
    
}
  
module.exports = { createDeleteAd };
  