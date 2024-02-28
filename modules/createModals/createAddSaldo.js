const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');

function createAddSaldo(interaction) {

    if (interaction.customId === 'comprarSaldo') {

        const modal = new ModalBuilder()
            .setCustomId('saldoModal')
            .setTitle(`Adicionar saldo`);
  
        const valorInput = new TextInputBuilder()
            .setCustomId('valorInput')
            .setLabel("Digite o valor que deseja adicionar.")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(6)
            .setMinLength(1);

        const firstActionRow = new ActionRowBuilder().addComponents(valorInput);

        modal.addComponents(firstActionRow);
        
        interaction.showModal(modal);
        
    }
}
  
module.exports = { createAddSaldo };
  