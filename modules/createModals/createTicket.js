const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');

function createTicket(interaction) {

    if (interaction.customId === 'ticket') {

        const modal = new ModalBuilder()
            .setCustomId('ticketModal')
            .setTitle(`Formulario para Suporte`);
  
        const questionInput = new TextInputBuilder()
            .setCustomId('questionInput')
            .setLabel("Digite sua dúvida")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false);

        const firstActionRow = new ActionRowBuilder().addComponents(questionInput);

        modal.addComponents(firstActionRow);

        interaction.showModal(modal);
        
    }
}
  
module.exports = { createTicket };
  