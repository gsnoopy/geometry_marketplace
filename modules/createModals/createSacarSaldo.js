const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');

function createSacarSaldo(interaction) {


        const modal = new ModalBuilder()
            .setCustomId('saqueModal')
            .setTitle(`Sacar saldo`);
  
        const valorInput = new TextInputBuilder()
            .setCustomId('valorInput')
            .setLabel("Digite o valor que deseja sacar.")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(6)
            .setMinLength(1);

        const firstActionRow = new ActionRowBuilder().addComponents(valorInput);

        modal.addComponents(firstActionRow);
        
        interaction.showModal(modal);
        
    
}
  
module.exports = { createSacarSaldo };
  